import { Pressable, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const HeaderIcon = ({ color, name, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialIcons color={color} name={name} size={28} style={styles.icon} />
    </Pressable>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});
