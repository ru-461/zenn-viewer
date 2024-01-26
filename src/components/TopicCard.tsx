import useKeywordStore from '@/src/store/useKeywordStore';
import type { Topic } from '@/src/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TopicCard = ({
  topic,
  showCount,
}: { topic: Topic; showCount: boolean }) => {
  const router = useRouter();
  const setKeyword = useKeywordStore((state) => state.setKeyword);

  const onPressHandle = async () => {
    // 検索キーワードをステートにセットして検索結果へ遷移
    setKeyword(topic.display_name);
    router.push({ pathname: '/results', params: { query: topic.name } });
  };

  return (
    <View style={styles.box}>
      <Pressable onPress={onPressHandle}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={topic.image_url}
            placeholder={require('@/assets/images/no_image.png')}
            placeholderContentFit="contain"
          />
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
