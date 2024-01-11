import { StyleSheet, Text, View } from 'react-native';

import { Article } from '../types';

import EmojiBox from './EmojiBox';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <View
      style={article.article_type === 'tech' ? styles.techBox : styles.ideaBox}>
      <View style={styles.row}>
        <EmojiBox emoji={article.emoji} />
        <Text style={styles.text}>{article.title}</Text>
      </View>
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
  },
  text: { marginLeft: 10, fontWeight: 'bold', flexWrap: 'wrap' },
});
