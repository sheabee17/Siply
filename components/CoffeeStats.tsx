import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function CoffeeStats() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Afacad: require('../assets/fonts/Afacad.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.row}>
      <Stat icon="wifi" label="WIFI" value="143 Mbps" />
      <Stat icon="battery-charging" label="POWER" value="Many" />
      <Stat icon="volume-x" label="NOISE" value="Quiet" />
    </View>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.card}>
      <Feather name={icon} size={22} color="#6F4E37" />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },

  card: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  label: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#A99C93',
    fontFamily: 'Afacad',
  },

  value: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
    fontFamily: 'Afacad',
  },
});