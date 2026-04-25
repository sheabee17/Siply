import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
export default function OverviewTab() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Afacad: require('../assets/fonts/Afacad.ttf'),
        SourceSans3: require('../assets/fonts/SourceSans3.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  const features = [
    'WALKING DISTANCE',
    'SPECIALTY DRINKS',
    'POWER OUTLETS',
    'WHEELCHAIR ACCESS',
    'BATHROOM AVAILABILITY',
    'ALLERGEN FRIENDLY',
  ];

  const tags = ['#cozy', '#natural'];

  return (
    <View style={styles.container}>

      {/* ABOUT */}
      <Text style={styles.title}>ABOUT THE SPACE</Text>

      <Text style={styles.overviewText}>
        A cozy, modern neighborhood coffee shop with warm lighting, natural wood accents,
        and plenty of greenery. The atmosphere is calm and welcoming, with soft background music.
        Free high-speed Wi-Fi (around 120-170 Mbps) is reliable even during busy hours.
      </Text>

      {/* TAGS */}
      <View style={styles.tagContainer}>
        {tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* AMENITIES */}
      <Text style={styles.title}>AMENITIES & PERKS</Text>

      <FlatList
        data={features}
        numColumns={2}
        keyExtractor={(item) => item}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.featureCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="sparkles-outline" size={20} color="#6F4E37" />
            </View>
            <Text style={styles.featureText}>{item}</Text>
          </View>
        )}
      />

      {/* LOCATION */}
      <Text style={styles.title}>LOCATION & HOURS</Text>

      <View style={styles.infoRow}>
        <View style={styles.iconContainerSmall}>
          <Ionicons name="location-outline" size={18} color="#6F4E37" />
        </View>
        <View>
          <Text style={styles.overviewText1}>123 Brew St, Downtown</Text>
          <Text style={styles.overviewText2}>Cross-street: Broadway & 4th</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconContainerSmall}>
          <Ionicons name="time-outline" size={18} color="#6F4E37" />
        </View>
        <View>
          <Text style={styles.overviewText1}>Today: 07:00 - 19:00</Text>
          <Text style={styles.overviewText3}>Open Now • Closes in 9 hours</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 13,
    marginTop: 16,
    color: '#A99C93',
    fontFamily: 'Afacad',
    fontWeight: '500',
  },

  overviewText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'SourceSans3',
    marginTop: 4,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 12,
    color: '#515151',
    fontFamily: 'SourceSans3',
    fontWeight: '600',
  },

  /* ===== GRID FIX ===== */
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  featureCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 2,
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    elevation: 3,
  },

  featureText: {
    fontSize: 12,
    fontFamily: 'Afacad',
    fontWeight: 'bold',
    color: '#434342',
    flex: 1,
    textAlign: 'right',
  },

  /* LOCATION */
  infoRow: {
    flexDirection: 'row',
    marginTop: 6,
  },

  iconContainerSmall: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    elevation: 3,
  },

  overviewText1: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Afacad',
  },

  overviewText2: {
    fontSize: 11,
    color: '#616161',
    fontFamily: 'Afacad',
  },

  overviewText3: {
    fontSize: 11,
    color: '#51926B',
    fontFamily: 'Afacad',
  },
});