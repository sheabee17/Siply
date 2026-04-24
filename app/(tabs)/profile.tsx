import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'San Antonio, TX',
  bio: 'Coffee lover & digital nomad. Always searching for the perfect cup.',
  activeSince: '2024',
  followers: 128,
  following: 84,
  dayStreak: 7,
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIymocSty1yWfEABwK5DJFLn44mkOBAmTKQ&s',
};

const reviews = [
  {
    id: '1',
    cafeName: 'The Daily Grind',
    image: 'https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg',
    rating: 4,
    reviewText:
      'Really enjoyed this spot! The coffee was smooth, and the atmosphere was cozy without feeling cramped.',
  },
  {
    id: '2',
    cafeName: 'The Bean Bar',
    image: 'https://s.hdnux.com/photos/01/34/10/33/24151789/3/rawImage.jpg',
    rating: 5,
    reviewText:
      'Absolutely loved this café. The coffee was rich and flavorful, and the space was bright and inviting.',
  },
];

function StatBox({ value, label }: { value: number | string; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ReviewCard({
  cafeName,
  image,
  rating,
  reviewText,
}: {
  cafeName: string;
  image: string;
  rating: number;
  reviewText: string;
}) {
  return (
    <View style={styles.reviewCard}>
      <Image source={{ uri: image }} style={styles.reviewImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewTitle}>{cafeName}</Text>
        <Text style={styles.stars}>{'★'.repeat(rating)}</Text>
        <Text style={styles.reviewText}>{reviewText}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.settingsButton}>
        <Text style={styles.settingsText}>⚙</Text>
      </Pressable>

      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <Text style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>

      <Text style={styles.bio}>{user.bio}</Text>
      <Text style={styles.meta}>📍 {user.location}</Text>
      <Text style={styles.meta}>☕ Active since {user.activeSince}</Text>

      <View style={styles.statsRow}>
        <StatBox value={user.followers} label="Followers" />
        <StatBox value={user.following} label="Following" />
        <StatBox value={user.dayStreak} label="Day Streak" />
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Share Profile</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/edit-profile')}>
          <Text style={styles.primaryButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Reviews</Text>

      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#white',
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  settingsText: {
    fontSize: 28,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  bio: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  meta: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    color: '#A99C93',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#B8AAA0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    gap: 12,
  },
  reviewImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  reviewContent: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  stars: {
    color: '#D9A300',
    marginBottom: 6,
  },
  reviewText: {
    color: '#333',
    lineHeight: 20,
  },
});