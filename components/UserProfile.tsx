import { useState, useCallback } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import UserReviewsSection from './UserReviewsSection';
import { useUser } from '../hooks/use-user';
import { useCurrentUser } from '../hooks/use-current-user';

type UserProfileProps = {
  userId: string;
};

export default function UserProfile({ userId }: UserProfileProps) {
  const router = useRouter();
  const { user, loading, error, refresh } = useUser(userId);
  const { currentUserId } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = currentUserId === userId;

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#B8AAA0" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error ? error.message : 'User not found.'}
        </Text>
      </View>
    );
  }

  const reviews = user.reviews.map((r) => ({
    id: r.id,
    cafeId: r.cafe.id,
    cafeSlug: r.cafe.slug,
    cafeName: r.cafe.name,
    cafeImage: r.cafe.images?.[0]?.url ?? '',
    rating: r.rating,
    reviewText: r.comment,
    createdAt: '',
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader
        fullName={user.name}
        bio={user.bio ?? ''}
        location={user.location ?? ''}
        activeSince={''}
        avatar={user.avatar ?? 'https://randomuser.me/api/portraits/lego/1.jpg'}
        onPressSettings={isOwnProfile ? () => router.push('/modal') : undefined}
      />

      <ProfileStats
        followers={0}
        following={0}
        dayStreak={0}
      />

      <View style={styles.buttonRow}>
        {isOwnProfile ? (
          <>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Share Profile</Text>
            </Pressable>
            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/edit-profile')}
            >
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              style={[styles.primaryButton, isFollowing && styles.secondaryButton]}
              onPress={() => setIsFollowing((f) => !f)}
            >
              <Text style={[styles.primaryButtonText, isFollowing && styles.secondaryButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Share Profile</Text>
            </Pressable>
          </>
        )}
      </View>

      <UserReviewsSection reviews={reviews} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: '#fff' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  errorText: { fontSize: 16, color: '#A04040', textAlign: 'center' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 6, marginBottom: 24 },
  primaryButton: { flex: 1, backgroundColor: '#B8AAA0', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  secondaryButton: { flex: 1, backgroundColor: '#EDE7E1', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#5A4B40', fontWeight: '600', fontSize: 15 },
});