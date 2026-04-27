import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState } from 'react';

type EditProfileFormProps = {
  initialValues: {
    name: string;
    location: string;
    bio: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    avatar: string;
  };
  onSave?: (values: {
    name: string;
    location: string;
    bio: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    avatar: string;
  }) => void;
};

function FieldLabel({ label, locked = false }: { label: string; locked?: boolean }) {
  return (
    <Text style={styles.label}>
      {label} {locked ? '🔒' : ''}
    </Text>
  );
}

export default function EditProfileForm({
  initialValues,
  onSave,
}: EditProfileFormProps) {
  const [form, setForm] = useState(initialValues);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: form.avatar }} style={styles.avatar} />
      </View>

      <FieldLabel label="Name" />
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => updateField('name', text)}
      />

      <FieldLabel label="Location" />
      <TextInput
        style={styles.input}
        value={form.location}
        onChangeText={(text) => updateField('location', text)}
      />

      <FieldLabel label="Bio" />
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={form.bio}
        onChangeText={(text) => updateField('bio', text)}
        multiline
        textAlignVertical="top"
      />

      <FieldLabel label="Email" locked />
      <TextInput
        style={styles.input}
        value={form.email}
        editable={false}
      />

      <FieldLabel label="Phone Number" locked />
      <TextInput
        style={styles.input}
        value={form.phoneNumber}
        editable={false}
      />

      <FieldLabel label="Birthday" locked />
      <TextInput
        style={styles.input}
        value={form.birthday}
        editable={false}
      />

      <Pressable style={styles.saveButton} onPress={() => onSave?.(form)}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#white',
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editAvatarButton: {
    position: 'absolute',
    right: -2,
    bottom: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8C674C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    color: '#A39284',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1E1E1E',
    marginBottom: 14,
  },
  bioInput: {
    minHeight: 120,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#B5A79A',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});