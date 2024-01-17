import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import useSWR from 'swr';
import TopicCard from '../../components/TopicCard';
import type { Topic } from '../../types';

const ExploreTabScreen = () => {
  const { data, error, isLoading, mutate } = useSWR(
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
      <FlatGrid
        data={topics}
        itemDimension={150}
        renderItem={(topic) => (
          <TopicCard key={topic.item.id} topic={topic.item} />
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
