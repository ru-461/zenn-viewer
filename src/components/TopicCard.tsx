import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import type { Topic } from '../types';

const TopicCard = ({ topic }: { topic: Topic }) => {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Image style={styles.image} source={topic.image_url} />
        <View style={styles.infoBox}>
          <Text style={styles.nameText}>{topic.display_name}</Text>
          <Text style={styles.countText}>count: {topic.taggings_count}</Text>
        </View>
      </View>
    </View>
  );
};
export default TopicCard;

const styles = StyleSheet.create({
  box: {
    flex: 1,
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
  },
  infoBox: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    flexWrap: 'wrap',
  },
  countText: {
    fontSize: 12,
  },
});
