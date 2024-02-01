import HeaderIcon from '@/src/components/HeaderIcon';
import TabBarIcon from '@/src/components/TabbarIcon';
import useKeywordStore from '@/src/store/useKeywordStore';
import { Tabs, router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

const TabLayout = () => {
  // 検索キーワード
  const keyword = useKeywordStore((state) => state.keyword);

  const handlePress = () => {
    router.push('/search');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerRight: () => (
          <HeaderIcon color="#7C7C7D" name="search" onPress={handlePress} />
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
          headerTitle: () => (
            <Pressable style={styles.textInput} onPress={handlePress}>
              <Text>{keyword}</Text>
            </Pressable>
          ),
          headerRight: () => <></>,
          tabBarActiveTintColor: '#3EA8FF',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    borderRadius: 4,
    height: 30,
    width: 240,
    margin: 24,
    padding: 8,
  },
});
