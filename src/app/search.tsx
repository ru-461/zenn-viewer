import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import useSWR from 'swr';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [suggestion, setSuggestion] = useState<Array<Topic>>([]);
  const textInputRef = useRef(null);
  // 最大表示
  const renderLimit = 5;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // フォーカス
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 1000);

    // クリーンアップ
    return () => clearTimeout(timeoutId);
  }, []);

  const { data } = useSWR(
    'https://zenn.dev/api/topics?count=120&order=count&exclude_alias=true&exclude_topicnames=初心者%2Cメモ%2Czenn',
  );

  const handleChangeText = (text: string) => {
    if (text === '') {
      setValue(text);
      setSuggestion([]);
      return;
    }

    // Type
    const topics = data.topics as Array<Topic>;

    // フィルター
    const matchTopics = topics.filter((topic) => {
      return topic.display_name.toLowerCase().includes(text.toLowerCase());
    });

    // 検索候補としてセット
    setSuggestion(matchTopics);

    setValue(text);
  };

  const onBlur = () => {
    // キーボードを閉じる
    Keyboard.dismiss();
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Search', headerBackTitle: 'Back' }} />
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.textInput, isFocus && styles.activeInput]}
          value={value}
          ref={textInputRef}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={onBlur}
          placeholder="Search keyword..."
          placeholderTextColor="#000"
          onChangeText={(value) => handleChangeText(value)}
        />
      </View>
      {isFocus && suggestion && (
        <View style={styles.contentsLayout}>
          {suggestion.map((topic, index) => {
            if (index < renderLimit) {
              return (
                <TopicCard key={topic.id} topic={topic} showCount={false} />
              );
            }
          })}
        </View>
      )}
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 16,
    height: 48,
    margin: 24,
    padding: 8,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: '#3EA8FF',
  },
  contentsLayout: {
    marginHorizontal: 24,
    rowGap: 2,
  },
});
