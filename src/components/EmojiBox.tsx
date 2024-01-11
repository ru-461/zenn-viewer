import { StyleSheet, Text, View } from 'react-native';

const EmojiBox = ({ emoji }: { emoji: string }) => {
  return (
    <View style={styles.box}>
      <Text>{emoji}</Text>
    </View>
  );
};
export default EmojiBox;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    width: 50,
    height: 50,
  },
});
