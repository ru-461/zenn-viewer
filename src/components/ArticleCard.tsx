import { StyleSheet, Text, View } from 'react-native';

import { Article } from '../types';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <View
      style={article.article_type === 'tech' ? styles.techBox : styles.ideaBox}>
      <View style={styles.row}>
        <View style={styles.emojiBox}>
          <Text>{article.emoji}</Text>
        </View>
        <View>
          <Text>{article.title}</Text>
        </View>
      </View>
    </View>
  );
};
export default ArticleCard;

const styles = StyleSheet.create({
  techBox: {
    flex: 1,
    backgroundColor: '#ECF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  ideaBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emojiBox: {
    width: 50,
    height: 50,
  },
  contentBox: {},
});
