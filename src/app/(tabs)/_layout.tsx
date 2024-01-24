import { Tabs, router } from 'expo-router';
import HeaderIcon from '../../components/HeaderIcon';
import TabBarIcon from '../../components/TabbarIcon';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerRight: () => (
          <HeaderIcon
            color="#7C7C7D"
            name="search"
            onPress={() => router.push('/search')}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trending',
          headerTintColor: '#2E2E2E',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} name="trending-up" />
          ),
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerTintColor: '#2E2E2E',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} name="selection-search" />
          ),
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          href: null,
          headerTintColor: '#2E2E2E',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} name="selection-search" />
          ),
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
