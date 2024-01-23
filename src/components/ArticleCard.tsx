import { Image } from 'expo-image';
import { Link } from 'expo-router';
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
          <View>
            <Text style={styles.text}>{article.title}</Text>
            <View style={styles.row}>
              <Image
                style={styles.avatorImage}
                source={{ uri: article.user.avatar_small_url }}
              />
              <Link
                style={styles.infoText}
                href={{
                  pathname: '/users/[username]',
                  params: { username: article.user.username },
                }}
              >
                {article.user.username}
              </Link>
              <Text style={[styles.infoText, styles.likeText]}>
                ♡{article.liked_count}
              </Text>
            </View>
          </View>
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
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  infoText: {
    color: '#000000d1',
    fontSize: 15,
    paddingLeft: 4,
  },
  likeText: {
    paddingLeft: 8,
  },
  avatorImage: {
    width: 20,
    height: 20,
    borderRadius: 32,
    margin: 4,
  },
});
