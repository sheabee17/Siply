import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    name: 'The Daily Grind',
    reviews: 15,
    rating: 4,
    address: '14 Jackson Street, Alameda, CA, 94501',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
  },
  {
    id: '2',
    name: 'The Bean Bar',
    reviews: 10,
    rating: 5,
    address: '135 Trinity Boulevard, Los Angeles, CA, 94503',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
  },
  {
    id: '3',
    name: "Leo’s Cafe",
    reviews: 13,
    rating: 3,
    address: '31 Java Dr, Orange Beach, CA, 92301',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
  },
];

const StarRating = ({ rating }: { rating: number}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1,2,3,4,5].map((i) => (
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

const Card = ({ item }: {item: any}) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.title}>{item.name} ({item.reviews} Reviews)</Text>
      <StarRating rating={item.rating} />
      <Text style={styles.subtitle}>Local Cafe</Text>
      <Text style={styles.address}>{item.address}</Text>
    </View>
    <Ionicons name="ellipsis-horizontal" size={20} color="#555" />
  </View>
);

export default function App() {
  // Try to Connect Search Bar to Database
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="arrow-back" size={20} />
        <TextInput placeholder="Search" style={{ flex: 1, marginLeft: 10 }} />
        <Ionicons name="close" size={20} />
      </View>

      {/* Fake Map Area */}
      <View style={styles.map} />

      {/* Filters */}
      <View style={styles.filters}>
        {['OPEN NOW', 'WALKING DISTANCE', 'HIGHLY RATED'].map((f) => (
          <TouchableOpacity key={f} style={styles.filterBtn}>
            <Text>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {['Map', 'Browse', 'Profile'].map((tab) => (
          <TouchableOpacity key={tab} style={styles.navBtn}>
            <Text>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 25,
    margin: 10
  },
  map: {
    height: 200,
    backgroundColor: '#cfd8dc'
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  filterBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#666'
  },
  address: {
    color: '#888',
    fontSize: 12
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    padding: 10
  },
  navBtn: {
    padding: 10
  }
});
