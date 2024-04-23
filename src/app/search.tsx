import TopicCard from '@/src/components/TopicCard';
import useKeywordStore from '@/src/store/useKeywordStore';
import type { Topic } from '@/src/types';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import useTopics from './hooks/useTopics';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [suggestion, setSuggestion] = useState<Array<Topic>>([]);
  const textInputRef = useRef(null);
  // 最大表示
  const renderLimit = 5;

  // 検索キーワード
  const keyword = useKeywordStore((state) => state.keyword);
  const setKeyword = useKeywordStore((state) => state.setKeyword);

  // Fetch Topics
  const { topics, error, isLoading } = useTopics();

  if (isLoading) {
    // TODO: Loading
  }

  if (error) {
    // TODO: Error
  }

  useFocusEffect(
    useCallback(() => {
      // キーワードをセット
      if (keyword) {
        // 検索候補としてセット
        setSearchValue(`${keyword}`);
        // サジェスト
        setSuggestion(filterTopic(keyword, topics));
      }
    }, [keyword, topics]),
  );

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

  const filterTopic = (display_name: string, topics: Topic[]): Array<Topic> => {
    // フィルター
    const matchedTopics = topics.filter((topic) =>
      topic.display_name.toLowerCase().includes(display_name.toLowerCase()),
    );

    return matchedTopics;
  };

  const handleChangeText = (text: string) => {
    if (!text.trim()) {
      setSearchValue(text);
      setSuggestion([]);
      return;
    }

    // フィルターした結果を検索候補としてセット
    setSuggestion(filterTopic(text, topics));

    setSearchValue(text);
  };

  const handleSubmitEditing = () => {
    if (!searchValue.trim()) {
      setSearchValue('');
      return;
    }
    // 検索キーワードをセットして検索実行
    setKeyword(searchValue);
    router.push({ pathname: '/results', params: { query: searchValue } });
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
          value={searchValue}
          ref={textInputRef}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={onBlur}
          placeholder="Search keyword..."
          placeholderTextColor="#000"
          onChangeText={(value) => handleChangeText(value)}
          onSubmitEditing={handleSubmitEditing}
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
