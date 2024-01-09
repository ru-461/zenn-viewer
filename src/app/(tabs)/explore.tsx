import { StyleSheet, Text, View } from 'react-native';

const ExploreTabScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Explore tab screen</Text>
    </View>
  );
};
export default ExploreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
