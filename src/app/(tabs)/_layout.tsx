import { Tabs } from 'expo-router';

import TabBarIcon from '../../components/tabbaricon';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trending',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon color={color} name="numeric-1" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon color={color} name="numeric-2" />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
