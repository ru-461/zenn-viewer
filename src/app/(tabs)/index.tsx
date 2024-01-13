import { useState } from 'react';

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import useSWR from 'swr';

import ArticleCard from '../../components/ArticleCard';
import { Article } from '../../types';

const TrendingTabScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
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
        <Text>failed to load</Text>
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

  const articles = data.articles as Array<Article>;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        renderItem={article => (
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
