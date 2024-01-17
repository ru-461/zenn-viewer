import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Article } from '../types';
import EmojiBox from './EmojiBox';

const ArticleCard = ({ article }: { article: Article }) => {
  const baseUri = 'https://zenn.dev';
  const articleUri = `${baseUri}/${article.path}`;

  const onPressHandle = async () => {
    await WebBrowser.openBrowserAsync(articleUri);
  };

  return (
    <View
      style={article.article_type === 'tech' ? styles.techBox : styles.ideaBox}
    >
      <Pressable onPress={onPressHandle}>
        <View style={styles.row}>
          <EmojiBox emoji={article.emoji} />
          <Text style={styles.text}>{article.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default ArticleCard;

const styles = StyleSheet.create({
  techBox: {
    flex: 1,
    backgroundColor: '#ECF5FF',
    padding: 12,
  },
  ideaBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});
