/**
 * UserReviewsSection — renders the list of cafe reviews a user has written.
 *
 * Scoped to a single user (unlike ReviewsTab, which lives on the cafe page
 * and shows all reviews for a given cafe).
 */

import { FontAwesome } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

type UserReview = {
  id: string;
  cafeId: string;
  cafeSlug: string;
  cafeName: string;
  cafeImage: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};

type UserReviewsSectionProps = {
  reviews: UserReview[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FontAwesome
          key={i}
          name="star"
          size={14}
          color={i <= rating ? '#FFD700' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );
}

function ReviewCard({ review }: { review: UserReview }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/cafe/${review.cafeSlug}`)}
    >
      <Image source={{ uri: review.cafeImage }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.cafeName}>{review.cafeName}</Text>
          <Stars rating={review.rating} />
        </View>
        <Text style={styles.text} numberOfLines={3}>
          {review.reviewText}
        </Text>
      </View>
    </Pressable>
  );
}

export default function UserReviewsSection({ reviews }: UserReviewsSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>

      {reviews.length === 0 ? (
        <Text style={styles.emptyText}>No reviews yet.</Text>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    color: '#1E1E1E',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    paddingVertical: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cafeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    flex: 1,
    marginRight: 8,
  },
  text: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
  },
});
