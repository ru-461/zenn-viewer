import ArticleCard from '@/src/components/ArticleCard';
import { Article } from '@/src/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useUser from '../hooks/useUser';

const userScreen = () => {
  const { username } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, mutate } = useUser(username);

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
    <View style={styles.listContainer}>
      <Stack.Screen
        options={{
          title: 'aaa',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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

export default userScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
