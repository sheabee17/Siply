import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.title}>ABOUT THE SPACE</Text>

      <Text style={styles.overviewText}>
        A cozy, modern neighborhood coffee shop with warm lighting, natural wood accents, and plenty of greenery. The atmosphere is calm and welcoming, with soft background music. Free high-speed Wi-Fi (around 120-170 Mbps) is reliable even during busy hours, and outlets are easily accessible at most tables. Has a variety of seating options.
      </Text>

      <View style={styles.tagContainer}>
        {tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.title}>AMENITIES & PERKS</Text>

      <View style={styles.grid}>
        {features.map(feature => (
          <View key={feature} style={styles.featureCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="sparkles-outline" size={20} color="#6F4E37" />
            </View>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  infoRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
    color: '#000000',
    fontFamily: 'SourceSans3',
    marginTop: 4,
    fontWeight: '500',
  },
    overviewText1: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Afacad',
    marginTop: 4,
    fontWeight: '500',
  },
    overviewText2: {
    fontSize: 11,
    color: '#616161',
    fontFamily: 'Afacad',
    marginTop: 4,
    fontWeight: '400',
  },

    overviewText3: {
    fontSize: 11,
    color: '#51926B',
    fontFamily: 'Afacad',
    marginTop: 4,
    fontWeight: '500',
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
    fontWeight: '600'
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  featureCard: {
    width: (width - 60) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
});