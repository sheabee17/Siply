import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, Stack } from 'expo-router';

import OverviewTab from '../../components/OverviewTab';
import ReviewsTab from '../../components/ReviewsTab';
import VibesTab from '../../components/VibesTab';

export default function CoffeeProfileScreen() {
  const { slug } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Reviews' | 'Vibes'>(
    'Overview'
  );

  const [cafe, setCafe] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:3001/api/cafes/${slug}`)
      .then((res) => res.json())
      .then(setCafe)
      .catch(console.error);
  }, [slug]);

  if (!cafe) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ padding: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/map1.png')}
          style={styles.map}
        />

        <View style={styles.favoriteButton}>
          <Feather name="star" size={30} color="#6F4E37" />
        </View>

        <View style={styles.overlay}>
          <Text style={styles.title}>{cafe.name}</Text>
          <View style={styles.metaRow}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.boldText}>{cafe.rating}</Text>
            <Text style={styles.metaText}>
              ({cafe.reviews?.length || 0} reviews)
            </Text>
            <Text style={styles.metaText}> · $$ · </Text>
            <Feather name="map-pin" size={14} color="#595959" />
            <Text style={styles.metaText}> · </Text>
          </View>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <Stat icon="wifi" label="WIFI" value={cafe.wifiSpeed || "N/A"} />
        <Stat icon="battery-charging" label="POWER" value={cafe.powerOutlets || "N/A"} />
        <Stat icon="volume-x" label="NOISE" value={cafe.noiseLevel || "N/A"} />
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {[
          { name: 'Overview', icon: 'info' },
          { name: 'Reviews', icon: 'message-square' },
          { name: 'Vibes', icon: 'umbrella' },
        ].map((tab) => {
          const active = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabItem, active && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.name as any)}
            >
              <Feather
                icon={tab.icon}
                size={16}
                color={active ? '#6F4E37' : '#A99C93'}
              />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {activeTab === 'Overview' && <OverviewTab cafe={cafe} />}
        {activeTab === 'Reviews' && (
          <ReviewsTab reviews={cafe.reviews} />
        )}
        {activeTab === 'Vibes' && <VibesTab cafe={cafe} />}
      </View>
    </View>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statCard}>
      <Feather name={icon} size={22} color="#6F4E37" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* HEADER */
  header: {
    height: 200,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 16,
  },
  title: {
    fontSize: 42,
    color: '#000',
    fontFamily: 'Afacad',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#595959',
    fontFamily: 'Afacad',
  },
  boldText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
    fontFamily: 'Afacad',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* STATS */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 11,
    color: '#A99C93',
  },
  statValue: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
  },

  /* TABS */
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#6F4E37',
  },
  tabText: {
    marginLeft: 6,
    color: '#A99C93',
  },
  tabTextActive: {
    color: '#6F4E37',
    fontWeight: '600',
  },

  /* CONTENT */
  content: {
    padding: 16,
  },
});