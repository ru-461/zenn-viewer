import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import useSWR from 'swr';

import ArticleCard from '../../components/ArticleCard';
import { Article } from '../../types';

const TrendingTabScreen = () => {
  const { data, error, isLoading } = useSWR('https://zenn.dev/api/articles');

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
