import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const textInputRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // フォーカス
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 500);

    // クリーンアップ
    return () => clearTimeout(timeoutId);
  }, []);

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Search', headerBackTitle: 'Back' }} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          ref={textInputRef}
          placeholder="Search keyword..."
          placeholderTextColor="#000"
          onChangeText={(value) => handleChangeText(value)}
        />
      </View>
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
  contentsLayout: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 16,
  },
});
