import ArticleCard from '@/src/components/ArticleCard';
import type { Article } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import useSearch from '../hooks/useSearch';

const ResultsScreen = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, mutate } = useSearch(query as string);

  const onRefresh = async () => {
    setRefreshing(true);
    mutate();
    setRefreshing(false);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Not found.</Text>
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
  const articles = data.articles as Array<Article>;

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={articles}
        onRefresh={onRefresh}
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

export default ResultsScreen;

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
