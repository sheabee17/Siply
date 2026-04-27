import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ReviewUser = {
  id: string;
  name: string;
  avatar: string;
};

type Review = {
  id: string;
  userId: string;
  user: ReviewUser;
  rating: number;
  comment: string;
};

export default function ReviewsTab({ reviews }: any){
  const router = useRouter();
  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : '0.0';

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
      <Pressable onPress={() => router.push(`/user/${item.user.id}`)}>
        <Image
          source={{
            uri:
              item.user.avatar ||
              'https://randomuser.me/api/portraits/men/1.jpg',
          }}
          style={styles.avatar}
        />
      </Pressable>

      <View style={{ flex: 1 }}>
        <View style={styles.reviewHeader}>
          <Pressable onPress={() => router.push(`/user/${item.user.id}`)}>
            <Text style={styles.userName}>{item.user.name}</Text>
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
          ({reviews.length} reviews)
        </Text>
      </View>

      {/* REVIEWS LIST */}
      <FlatList
        data={reviews}
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