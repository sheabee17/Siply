import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import OverviewTab from '../components/OverviewTab';
import ReviewsTab from '../components/ReviewsTab';
import VibesTab from '../components/VibesTab';

export default function CoffeeProfileScreen() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Reviews' | 'Vibes'>(
    'Overview'
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/map1.png')}
          style={styles.map}
        />
        <View style={styles.favoriteButton}>
          <Feather name="star" size={30} color="#6F4E37" />
        </View>
        <View style={styles.overlay}>
          <Text style={styles.title}>The Daily Grind</Text>
          <View style={styles.metaRow}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.boldText}>4.8</Text>
            <Text style={styles.metaText}>(526 reviews)</Text>
            <Text style={styles.metaText}> · $$ · </Text>
            <Feather name="map-pin" size={14} color="#595959" />
            <Text style={styles.metaText}>0.4 mi</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat icon="wifi" label="WIFI" value="143 Mbps" />
        <Stat icon="battery-charging" label="POWER" value="Many" />
        <Stat icon="volume-x" label="NOISE" value="Quiet" />
      </View>

      <View style={styles.tabs}>
        {[
          { name: 'Overview', icon: 'info' },
          { name: 'Reviews', icon: 'message-square' },
          { name: 'Vibes', icon: 'umbrella' },
        ].map((tab) => {
          const active = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabItem, active && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.name as any)}
            >
              <Feather
                name={tab.icon}
                size={16}
                color={active ? '#6F4E37' : '#A99C93'}
              />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.content}>
        {activeTab === 'Overview' && <OverviewTab />}
        {activeTab === 'Reviews' && <ReviewsTab />}
        {activeTab === 'Vibes' && <VibesTab />}
      </View>
    </View>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <ScrollView>
      <CoffeeHeader />
      <CoffeeStats />
      <CoffeeTabs />
    </ScrollView>
  );
}
