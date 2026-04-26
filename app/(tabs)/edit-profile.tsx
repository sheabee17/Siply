import { Alert, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import EditProfileForm from '../../components/EditProfileForm';
import { useCurrentUser } from '../../hooks/use-current-user';
import { useUser, updateUser } from '../../hooks/use-user';

export default function EditProfileScreen() {
  const router = useRouter();
  const { currentUserId } = useCurrentUser();
  const { user } = useUser(currentUserId ?? undefined);

  if (!user) return null;

  const initialValues = {
    firstName: user.name,
    lastName: '',
    location: user.location ?? '',
    bio: user.bio ?? '',
    email: user.email,
    phoneNumber: '',
    birthday: '',
    avatar: user.avatar ?? '',
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Profile' }} />

      <EditProfileForm
        initialValues={initialValues}
        onSave={async (values) => {
          if (!currentUserId) return;
          try {
            await updateUser(currentUserId, {
              name: values.firstName,
              bio: values.bio,
              location: values.location,
            });
            Alert.alert('Saved', 'Your profile changes have been saved.');
            router.back();
          } catch (e) {
            Alert.alert('Error', 'Could not save. Is the backend running?');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});