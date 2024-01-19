import { Tabs } from 'expo-router';
import TabBarIcon from '../../components/TabbarIcon';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="code" />,
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="code" />,
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
