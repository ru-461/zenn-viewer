import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const ResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen />
      <Text>Result</Text>
    </View>
  );
};
export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
