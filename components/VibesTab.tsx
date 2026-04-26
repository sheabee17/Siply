import React from 'react';
import { View, Image, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const VIBE_ICONS: Record<string, string> = {
  'VARIETY OF SEATING': 'chair',
  'NATURAL/DIM LIGHTING': 'light-mode',
  'POWER OUTLETS': 'outlet',
  'MEALS + DRINKS': 'restaurant',
  'STUDENT DISCOUNTS': 'assignment-ind',
  'NUTRITION FOCUSED': 'spa',
};

export default function VibesTab({ cafe }: any) {
  return (
    <View style={styles.container}>

      {/* IMAGE CAROUSEL */}
    {cafe.images?.length > 0 && (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cafe.images.map((item: any, index: number) => (
          <Image key={index} source={{ uri: item.url }} style={styles.image} />
        ))}
      </ScrollView>
    )}

      {/* VIBES GRID */}
      {cafe.vibes?.length > 0 && (
        <FlatList
          data={cafe.vibes}
          numColumns={2}
          keyExtractor={(item: any) => item.id}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          style={{ marginTop: 16 }}
          renderItem={({ item }: any) => (
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
      )}

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