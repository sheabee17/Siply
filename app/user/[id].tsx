/**
 * Dynamic route for viewing any user's profile.
 *
 * Navigate here with: router.push(`/user/${someUserId}`)
 *
 * If the userId in the URL matches the current logged-in user, the page
 * will automatically render in "own profile" mode (Edit button, etc.)
 * thanks to the conditional logic inside UserProfile.
 */

import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import UserProfile from '../../components/UserProfile';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Profile' }} />
      {id ? <UserProfile userId={id} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
