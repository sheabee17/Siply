import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ACTIVE_COLOR = '#8C674C';
const INACTIVE_COLOR = '#C4AFA5';
const TAB_BAR_BG = '#FDFAF8';

type TabIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  focused: boolean;
};

function TabIcon({ name, label, focused }: TabIconProps) {
  return (
    <View style={styles.wrapper}>
      {focused && <View style={styles.indicator} />}
      <FontAwesome
        name={name}
        size={20}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
      <Text style={[styles.label, { color: focused ? ACTIVE_COLOR : INACTIVE_COLOR }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    width: 70,
    gap: 3,
  },
  indicator: {
    position: 'absolute',
    top: -1,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: ACTIVE_COLOR,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopColor: '#EDE7E1',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 82 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 0,
          elevation: 8,
          shadowColor: '#8C674C',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="browse"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="search" label="Browse" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="user" label="Profile" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="list"
        options={{ href: null }}
      />
    </Tabs>

  );
}