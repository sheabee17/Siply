/**
 * Profile tab — shows the logged-in user's own profile.
 *
 * Just renders the unified <UserProfile /> component with the current user's
 * id. When UserProfile sees that the id matches the current user, it
 * automatically switches to "own profile" mode (Edit button, etc.).
 */

import { StyleSheet, Text, View } from 'react-native';

import UserProfile from '../../components/UserProfile';
import { useCurrentUser } from '../../hooks/use-current-user';

export default function ProfileScreen() {
  const { currentUserId } = useCurrentUser();

  if (!currentUserId) {
    return (
      <View style={styles.centered}>
        <Text>Please sign in to view your profile.</Text>
      </View>
    );
  }

  return <UserProfile userId={currentUserId} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});
