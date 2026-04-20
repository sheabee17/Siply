/**
 * UserProfile — unified user details page body.
 *
 * Works for both "viewing your own profile" and "viewing someone else's".
 * Conditional UI:
 *   - If `userId` matches the current logged-in user: show Edit Profile + Share.
 *   - Otherwise: show Follow + Share.
 *
 * Reuses the existing ProfileHeader and ProfileStats components so this
 * page stays visually consistent with the rest of the app.
 */

import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

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
  const { user, loading, error } = useUser(userId);
  const { currentUserId } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = currentUserId === userId;

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader
        fullName={`${user.firstName} ${user.lastName}`}
        bio={user.bio}
        location={user.location}
        activeSince={user.activeSince}
        avatar={user.avatar}
        onPressSettings={isOwnProfile ? () => router.push('/modal') : undefined}
      />

      <ProfileStats
        followers={user.followers}
        following={user.following}
        dayStreak={user.dayStreak}
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
              <Text
                style={[
                  styles.primaryButtonText,
                  isFollowing && styles.secondaryButtonText,
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Share Profile</Text>
            </Pressable>
          </>
        )}
      </View>

      <UserReviewsSection reviews={user.reviews} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#A04040',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
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
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#EDE7E1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#5A4B40',
    fontWeight: '600',
    fontSize: 15,
  },
});
