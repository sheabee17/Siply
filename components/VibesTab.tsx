import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
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
    <View style={styles.container}>

      {/* IMAGE CAROUSEL */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* GRID (FIXED) */}
      <FlatList
        data={tags}
        numColumns={2}
        keyExtractor={(item) => item.label}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.featureCard}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={item.icon as any}
                size={20}
                color="#6F4E37"
              />
            </View>

            <Text style={styles.featureText}>{item.label}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },

  image: {
    width: 300,
    height: 180,
    marginRight: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },

  /* ROW spacing between columns */
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