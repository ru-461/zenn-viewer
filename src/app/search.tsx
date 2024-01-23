import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const textInputRef = useRef(null);

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

  const handleChangeText = (text: string) => {
    if (text === '') {
      setValue(text);
      return;
    }

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
      {isFocus && (
        <View style={styles.contentsLayout}>
          <Text>Search</Text>
        </View>
      )}
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 12,
    marginHorizontal: 16,
  },
});
