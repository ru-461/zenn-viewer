import { StyleSheet } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabBarIcon = ({ color, name }) => {
  return (
    <MaterialCommunityIcons
      color={color}
      name={name}
      size={28}
      style={styles.icon}
    />
  );
};
export default TabBarIcon;

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
