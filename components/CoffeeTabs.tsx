import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import OverviewTab from './OverviewTab';
import ReviewsTab from './ReviewsTab';
import VibesTab from './VibesTab';

const TABS = [
  { name: 'Overview', icon: 'info' },
  { name: 'Reviews', icon: 'message-square' },
  { name: 'Vibes', icon: 'umbrella' },
] as const;

export default function CoffeeTabs() {
  const [active, setActive] = useState<typeof TABS[number]['name']>('Overview');

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tabContainer, active === tab.name && styles.activeTabContainer]}
            onPress={() => setActive(tab.name)}
          >
            <Feather
              name={tab.icon}
              size={16}
              color={active === tab.name ? '#6F4E37' : '#A99C93'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, active === tab.name && styles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabContent}>
        {active === 'Overview' && <OverviewTab />}
        {active === 'Reviews' && <ReviewsTab />}
        {active === 'Vibes' && <VibesTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'white',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTabContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#6F4E37',
  },
  tabText: {
    fontSize: 14,
    color: '#A99C93',
    fontFamily: 'Afacad',
  },
  activeTabText: {
    color: '#6F4E37',
    fontWeight: 'bold',
    fontFamily: 'Afacad',
  },
  tabContent: {
    backgroundColor: 'white',
  },
});