import { StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const HeaderIcon = ({ color, name, onPress }) => {
  return (
    <MaterialIcons
      color={color}
      name={name}
      onPress={onPress}
      size={28}
      style={styles.icon}
    />
  );
};
export default HeaderIcon;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});
