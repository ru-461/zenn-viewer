import TopicCard from '@/src/components/TopicCard';
import useKeywordStore from '@/src/store/useKeywordStore';
import type { Topic } from '@/src/types';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import useSWR from 'swr';

const ExploreTabScreen = () => {
  const keyword = useKeywordStore((state) => state.keyword);
  const removeKeyword = useKeywordStore((state) => state.removeKeyword);

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      // キーワードをステートから削除
      if (keyword) {
        removeKeyword();
      }
    }, [keyword]),
  );

  // Fetch Topics
  const { data, error, isLoading } = useSWR(
    'https://zenn.dev/api/topics?count=120&order=count&exclude_alias=true&exclude_topicnames=初心者%2Cメモ%2Czenn',
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Failed to load.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Type
  const topics = data.topics as Array<Topic>;

  return (
    <View style={styles.container}>
      <FlatGrid
        data={topics}
        itemDimension={150}
        renderItem={(topic) => (
          <TopicCard key={topic.item.id} topic={topic.item} showCount />
        )}
      />
    </View>
  );
};

export default ExploreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
