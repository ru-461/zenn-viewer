import { StyleSheet, Text, View } from 'react-native';

const TrendingTabScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Trending tab screen</Text>
    </View>
  );
};
export default TrendingTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
