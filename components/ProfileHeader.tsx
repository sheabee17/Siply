import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type ProfileHeaderProps = {
  fullName: string;
  bio: string;
  location: string;
  activeSince: string;
  avatar: string;
  onPressSettings?: () => void;
};

export default function ProfileHeader({
  fullName,
  bio,
  location,
  activeSince,
  avatar,
  onPressSettings,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.settingsButton} onPress={onPressSettings}>
        <Text style={styles.settingsText}>⚙</Text>
      </Pressable>

      <Image source={{ uri: avatar }} style={styles.avatar} />

      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.bio}>{bio}</Text>

      <Text style={styles.meta}>📍 {location}</Text>
      <Text style={styles.meta}>☕ Active since {activeSince}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
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
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  bio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  meta: {
    textAlign: 'center',
    color: '#6C6C6C',
    marginBottom: 4,
    fontSize: 14,
  },
});