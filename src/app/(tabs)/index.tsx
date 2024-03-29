import ArticleCard from '@/src/components/ArticleCard';
import useKeywordStore from '@/src/store/useKeywordStore';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import useArticles from '../hooks/useArticles';

const TrendingTabScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const keyword = useKeywordStore((state) => state.keyword);
  const removeKeyword = useKeywordStore((state) => state.removeKeyword);

  // Fetch Articles
  const { articles, error, isLoading, mutate } = useArticles();

  const onRefresh = async () => {
    setRefreshing(true);
    mutate();
    setRefreshing(false);
  };

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      // キーワードをステートから削除
      if (keyword) {
        removeKeyword();
      }
    }, [keyword]),
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

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={articles}
        onRefresh={onRefresh}
        refreshing={refreshing}
        estimatedItemSize={200}
        keyExtractor={(articles) => `${articles.id}`}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        renderItem={(article) => (
          <ArticleCard article={article.item} key={article.item.id} />
        )}
      />
    </View>
  );
};

export default TrendingTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
