import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import useSWR from 'swr';
import ArticleCard from '../../components/ArticleCard';
import { Article } from '../../types';

const TrendingTabScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    'https://zenn.dev/api/articles',
  );

  const onRefresh = async () => {
    setRefreshing(true);
    mutate();
    setRefreshing(false);
  };

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
  const articles = data.articles as Array<Article>;

  return (
    <View style={styles.container}>
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
export default TrendingTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
