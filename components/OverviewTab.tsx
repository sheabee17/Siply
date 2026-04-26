import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OverviewTab({ cafe }: any) {
  // Parse open/closed status from openHours string (e.g. "07:00 - 19:00")
  const getHoursStatus = (openHours: string) => {
    if (!openHours) return null;
    const now = new Date();
    const [openStr, closeStr] = openHours.split(' - ');
    const [openH, openM] = openStr.split(':').map(Number);
    const [closeH, closeM] = closeStr.split(':').map(Number);
    const openMins = openH * 60 + openM;
    const closeMins = closeH * 60 + closeM;
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const isOpen = nowMins >= openMins && nowMins < closeMins;
    const hoursLeft = Math.round((closeMins - nowMins) / 60);
    return { isOpen, hoursLeft };
  };

  const hoursStatus = getHoursStatus(cafe.openHours);

  return (
    <View style={styles.container}>

      {/* ABOUT */}
      <Text style={styles.title}>ABOUT THE SPACE</Text>
      <Text style={styles.overviewText}>{cafe.description}</Text>

      {/* TAGS */}
      {cafe.tags?.length > 0 && (
        <View style={styles.tagContainer}>
          {cafe.tags.map((t: any) => (
            <View key={t.id} style={styles.tag}>
              <Text style={styles.tagText}>{t.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* AMENITIES */}
      {cafe.amenities?.length > 0 && (
        <>
          <Text style={styles.title}>AMENITIES & PERKS</Text>
          <FlatList
            data={cafe.amenities}
            numColumns={2}
            keyExtractor={(item: any) => item.id}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }: any) => (
              <View style={styles.featureCard}>
                <View style={styles.iconContainer}>
                  <Ionicons name="sparkles-outline" size={20} color="#6F4E37" />
                </View>
                <Text style={styles.featureText}>{item.label}</Text>
              </View>
            )}
          />
        </>
      )}

      {/* LOCATION & HOURS */}
      <Text style={styles.title}>LOCATION & HOURS</Text>

      <View style={styles.infoRow}>
        <View style={styles.iconContainerSmall}>
          <Ionicons name="location-outline" size={18} color="#6F4E37" />
        </View>
        <View>
          <Text style={styles.overviewText1}>{cafe.address}</Text>
          {cafe.crossStreet ? (
            <Text style={styles.overviewText2}>Cross-street: {cafe.crossStreet}</Text>
          ) : null}
        </View>
      </View>

      {cafe.openHours && (
        <View style={styles.infoRow}>
          <View style={styles.iconContainerSmall}>
            <Ionicons name="time-outline" size={18} color="#6F4E37" />
          </View>
          <View>
            <Text style={styles.overviewText1}>Today: {cafe.openHours}</Text>
            {hoursStatus && (
              <Text style={styles.overviewText3}>
                {hoursStatus.isOpen
                  ? `Open Now • Closes in ${hoursStatus.hoursLeft} hours`
                  : 'Closed Now'}
              </Text>
            )}
          </View>
        </View>
      )}

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