import { ScrollView } from 'react-native';
import CoffeeHeader from '../components/CoffeeHeader';
import CoffeeStats from '../components/CoffeeStats';
import CoffeeTabs from '../components/CoffeeTabs';
export default function CafeScreen() {
  return (
    <ScrollView>
      <CoffeeHeader />
      <CoffeeStats />
      <CoffeeTabs />
    </ScrollView>
  );
}
