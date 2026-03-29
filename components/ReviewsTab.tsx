import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const sampleReviews = [
  {
    id: '1',
    user: 'John Doe',
    rating: 4,
    comment: 'Amazing coffee and cozy atmosphere! Not too loud either.',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
  {
    id: '2',
    user: 'Jane Doe',
    rating: 5,
    comment: 'Great place to work, love the outlet availability!',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
  {
    id: '3',
    user: 'Jane Doe',
    rating: 4,
    comment: 'Friendly staff and delicious pastries!',
    avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
  },
];

export default function ReviewsTab() {
  const overallRating = 4.8;
  const totalReviews = 526;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={14}
          color={i <= rating ? '#FFD700' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const renderReview = ({ item }: any) => (
    <View style={styles.reviewCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item.user}</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.overallCard}>
      {renderStars(Math.round(overallRating))}
      <Text style={styles.totalReviews}>({totalReviews} reviews)</Text>
    </View>
      <FlatList
        data={sampleReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={{ paddingTop: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white', flex: 1 },

  overallCard: {
    backgroundColor: '#FAF3EE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    alignSelf: 'center',
  },
  overallRating: {
    fontSize: 20,
    fontFamily: 'Afacad',
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#434342',
  },
  totalReviews: {
    fontSize: 12,
    color: '#616161',
    fontFamily: 'Afacad',
    marginTop: 4,
  },

  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Afacad',
    fontWeight: 'bold',
    color: '#434342',
  },
  comment: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'SourceSans3',
    color: '#333',
  },
});