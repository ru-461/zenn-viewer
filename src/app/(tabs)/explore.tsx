import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import useSWR from 'swr';

import { FlashList } from '@shopify/flash-list';
import { FlatList } from 'react-native-gesture-handler';
import type { Topic } from '../../types';

const ExploreTabScreen = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    'https://zenn.dev/api/topics?count=120&order=count&exclude_alias=true&exclude_topicnames=初心者%2Cメモ%2Czenn',
  );

  const onRefresh = async () => mutate();

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
      <FlatList
        data={topics}
        renderItem={(topic) => (
          <View key={topic.item.id}>
            <Text>{topic.item.name}</Text>
          </View>
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
