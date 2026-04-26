import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Review = {
  id: string;
  userId: string;
  user: string;
  rating: number;
  comment: string;
  avatar: string;
};

const sampleReviews = [
  {
    id: '1',
    userId: 'user-1',
    user: 'John Doe',
    rating: 4,
    comment: 'Amazing coffee and cozy atmosphere! Not too loud either.',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
  {
    id: '2',
    userId: 'user-2',
    user: 'Jane Smith',
    rating: 5,
    comment: 'Great place to work, love the outlet availability!',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
  {
    id: '3',
    userId: 'user-2',
    user: 'Jane Smith',
    rating: 4,
    comment: 'Friendly staff and delicious pastries!',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
];

export default function ReviewsTab() {
  const router = useRouter();
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

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <Pressable onPress={() => router.push(`/user/${item.userId}`)}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View style={styles.reviewHeader}>
          <Pressable onPress={() => router.push(`/user/${item.userId}`)}>
            <Text style={styles.userName}>{item.user}</Text>
          </Pressable>
          {renderStars(item.rating)}
        </View>

        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* OVERALL RATING */}
      <View style={styles.overallCard}>
        {renderStars(Math.round(Number(overallRating)))}
        <Text style={styles.totalReviews}>
          ({sampleReviews.length} reviews)
        </Text>
      </View>

      {/* REVIEWS LIST */}
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