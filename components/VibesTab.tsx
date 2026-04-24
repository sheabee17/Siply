import React from 'react';
import { View, Image, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function VibesTab() {
  const images = [
    'https://s.hdnux.com/photos/01/34/02/75/24129403/5/rawImage.jpg',
    'https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg',
    'https://s.hdnux.com/photos/01/34/10/33/24151789/3/rawImage.jpg',
    'https://tb-static.uber.com/prod/image-proc/processed_images/e7c5333ea109c7ad1238fd86292ae93e/c9252e6c6cd289c588c3381bc77b1dfc.jpeg',
  ];

  const tags = [
    { label: 'VARIETY OF SEATING', icon: 'chair' },
    { label: 'NATURAL/DIM LIGHTING', icon: 'light' },
    { label: 'POWER OUTLETS', icon: 'outlet' },
    { label: 'MEALS + DRINKS', icon: 'restaurant' },
    { label: 'STUDENT DISCOUNTS', icon: 'assignment-ind' },
    { label: 'NUTRITION FOCUSED', icon: 'spa' },
  ];

  return (
    <View style={{ padding: 16, backgroundColor: 'white' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ width: 300, height: 180, marginRight: 10, borderRadius: 8, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>
      <View style={styles.grid}>
        {tags.map(tag => (
          <View key={tag.label} style={styles.featureCard}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={tag.icon as any} size={20} color="#6F4E37" />
            </View>
            <Text style={styles.featureText}>{tag.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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