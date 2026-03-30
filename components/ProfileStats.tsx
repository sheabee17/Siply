import { StyleSheet, Text, View } from 'react-native';

type ProfileStatsProps = {
  followers: number;
  following: number;
  dayStreak: number;
};

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function ProfileStats({
  followers,
  following,
  dayStreak,
}: ProfileStatsProps) {
  return (
    <View style={styles.row}>
      <StatBox value={followers} label="Followers" />
      <StatBox value={following} label="Following" />
      <StatBox value={dayStreak} label="Day Streak" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#EDE7E1',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#A39284',
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
});