import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function CoffeeHeader() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Afacad: require('../assets/fonts/Afacad.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/images/map1.png')}
        style={styles.map}
      />
      <View style={styles.favoriteButton}>
        <Feather name="star" size={35} color="#6F4E37" />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>The Daily Grind</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.boldText}>4.8</Text>
            <Text style={styles.metaText}>(526 reviews)</Text>
          </View>
          <Text style={styles.metaText}>· $$ ·  </Text>
          <View style={styles.metaItem}>
            <Feather name="map-pin" size={14} color="#595959" />
            <Text style={styles.metaText}>0.4 mi</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 45,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Afacad',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  metaText: {
    color: '#595959',
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Afacad',
  },
  boldText: {
    color: '#000000',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Afacad',
  },
  favoriteButton: {
  position: 'absolute',
  top: 12,
  right: 16,
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center'}
});