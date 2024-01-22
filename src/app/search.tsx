import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Search', headerBackTitle: 'Back' }} />
      <Text>Search</Text>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
