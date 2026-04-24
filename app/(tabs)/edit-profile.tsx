import { Alert, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import EditProfileForm from '../../components/EditProfileForm';

const initialValues = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'San Antonio, TX',
  bio: 'Coffee lover & digital nomad. Always searching for the perfect cup.',
  email: 'john.doe@email.com',
  phoneNumber: '(210) 555-1234',
  birthday: '01/15/1998',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIymocSty1yWfEABwK5DJFLn44mkOBAmTKQ&s',
};

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Profile' }} />

      <EditProfileForm
        initialValues={initialValues}
        onSave={(values) => {
          console.log('Saved values:', values);
          Alert.alert('Saved', 'Your profile changes have been saved.');
          router.back();
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