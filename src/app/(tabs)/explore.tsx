import TopicCard from '@/src/components/TopicCard';
import useKeywordStore from '@/src/store/useKeywordStore';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import useTopics from '../hooks/useTopics';

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
  const { topics, error, isLoading } = useTopics();

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
