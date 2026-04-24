import { ScrollView } from 'react-native';
import CoffeeHeader from '../components/CoffeeHeader';
import CoffeeStats from '../components/CoffeeStats';
import CoffeeTabs from '../components/CoffeeTabs';
export default function CafeScreen() {
  return (
    <View style={styles.statCard}>
      <Feather name={icon} size={22} color="#6F4E37" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

/* Styling */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* HEADER */
  header: {
    height: 200,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 16,
  },
  title: {
    fontSize: 42,
    color: '#000',
    fontFamily: 'Afacad',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#595959',
    fontFamily: 'Afacad',
  },
  boldText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: 'bold',
    fontFamily: 'Afacad',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* STATS */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 11,
    color: '#A99C93',
  },
  statValue: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
  },

  /* TABS */
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#6F4E37',
  },
  tabText: {
    marginLeft: 6,
    color: '#A99C93',
  },
  tabTextActive: {
    color: '#6F4E37',
    fontWeight: '600',
  },

  /* CONTENT */
  content: {
    padding: 16,
  },
});