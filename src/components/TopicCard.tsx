import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Topic } from '../types';

const TopicCard = ({
  topic,
  showCount,
}: { topic: Topic; showCount: boolean }) => {
  const onPressHandle = async () => {
    const baseUri = 'https://zenn.dev/topics';
    const topicUri = `${baseUri}/${topic.name}`;

    await WebBrowser.openBrowserAsync(topicUri);
  };

  return (
    <View style={styles.box}>
      <Pressable onPress={onPressHandle}>
        <View style={styles.row}>
          <Image style={styles.image} source={topic.image_url} />
          <View style={styles.infoBox}>
            <Text style={styles.nameText}>{topic.display_name}</Text>
            {showCount && (
              <Text style={styles.countText}>
                count: {topic.taggings_count}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default TopicCard;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderColor: '#E4EDF4',
    borderWidth: 2,
    marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 32,
  },
  infoBox: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    flexWrap: 'wrap',
  },
  countText: {
    marginTop: 6,
    fontSize: 12,
  },
});
