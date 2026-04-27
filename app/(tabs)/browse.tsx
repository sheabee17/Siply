import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function isOpenNow(openHours: string): boolean {
  if (!openHours) return false;
  const [openTime, closeTime] = openHours.split(' - ');
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color="#f5a623"
        />
      ))}
    </View>
  );
};

const Card = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.images?.[0]?.url }} style={styles.image} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <StarRating rating={Math.round(item.rating)} />
        <Text style={{ fontSize: 12, color: '#888' }}>({item.reviews?.length ?? 0} Reviews)</Text>
      </View>
      <Text style={styles.subtitle}>Local Cafe</Text>
      <Text style={styles.address}>{item.address}</Text>
      {isOpenNow(item.openHours) && (
        <View style={styles.openBadge}>
          <Text style={styles.openBadgeText}>OPEN NOW</Text>
        </View>
      )}
    </View>
    <Ionicons name="ellipsis-horizontal" size={20} color="#555" />
  </TouchableOpacity>
);

export default function BrowseScreen() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    highlyRated: false,
    openNow: false,
    walkingDistance: false,
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/cafes')
      .then(res => res.json())
      .then(cafes => {
        setData(cafes);
        setFilteredData(cafes);
        applyFilters(searchQuery, filters, cafes);
      })
      .catch(console.error);
  }, []);

  const applyFilters = (text: string, activeFilters: typeof filters, source = data) => {
    let results = [...source];

    if (text.trim() !== '') {
      results = results.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.address.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (activeFilters.highlyRated) {
      results = results.filter(item => item.rating >= 4);
    }

    if (activeFilters.openNow) {
      results = results.filter(item => isOpenNow(item.openHours));
    }

    if (activeFilters.walkingDistance) {
      results = results.filter(item => item.distance != null && item.distance <= 0.5);
    }

    setFilteredData(results);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(text, filters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    applyFilters('', filters);
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    const newFilters = { ...filters, [filterName]: !filters[filterName] };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = { highlyRated: false, openNow: false, walkingDistance: false };
    setFilters(resetFilters);
    setSearchQuery('');
    setFilteredData(data);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search coffee shops..."
          style={{ flex: 1, marginLeft: 10 }}
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results Count */}
      {(searchQuery.length > 0 || activeFilterCount > 0) && (
        <View style={styles.resultsCount}>
          <Text style={styles.resultsText}>
            Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
            {searchQuery ? ` for "${searchQuery}"` : ''}
            {activeFilterCount > 0 ? ` with ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} applied` : ''}
          </Text>
        </View>
      )}

      {/* Map */}
      <View style={styles.map}>
        <Image
          source={require('../../assets/images/map1.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterBtn, filters.openNow && styles.filterBtnActive]}
          onPress={() => toggleFilter('openNow')}
        >
          <Text style={filters.openNow ? styles.filterTextActive : styles.filterText}>
            OPEN NOW
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filters.walkingDistance && styles.filterBtnActive]}
          onPress={() => toggleFilter('walkingDistance')}
        >
          <Text style={filters.walkingDistance ? styles.filterTextActive : styles.filterText}>
            WALKING DISTANCE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filters.highlyRated && styles.filterBtnActive]}
          onPress={() => toggleFilter('highlyRated')}
        >
          <Text style={filters.highlyRated ? styles.filterTextActive : styles.filterText}>
            HIGHLY RATED
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <View style={styles.activeFiltersRow}>
          <Text style={styles.activeFiltersText}>Active filters: {activeFilterCount}</Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearFiltersText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => router.push(`/cafe/${item.slug}`)} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cafe-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No coffee shops found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            {(searchQuery.length > 0 || activeFilterCount > 0) && (
              <TouchableOpacity onPress={clearAllFilters} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Clear all filters</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
  },
  resultsCount: { paddingHorizontal: 16, paddingBottom: 8 },
  resultsText: { color: '#666', fontSize: 14 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#666' },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 8 },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#6F4E37',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  resetButtonText: { color: '#fff', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 12 },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: '#666', fontSize: 12, marginTop: 2 },
  address: { color: '#888', fontSize: 12, marginTop: 4 },
  openBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  openBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  map: { height: 200, backgroundColor: '#cfd8dc' },
  mapImage: { height: '100%', width: '100%' },
  filters: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  filterBtn: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
  },
  filterBtnActive: { backgroundColor: '#6F4E37' },
  filterText: { color: '#666', fontWeight: '500', fontSize: 12 },
  filterTextActive: { color: '#fff', fontWeight: '500', fontSize: 12 },
  activeFiltersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeFiltersText: { fontSize: 12, color: '#666' },
  clearFiltersText: { fontSize: 12, color: '#6F4E37', fontWeight: '500' },
});