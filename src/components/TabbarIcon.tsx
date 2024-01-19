import { StyleSheet } from 'react-native';

// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabBarIcon = ({ color, name }) => {
  return (
    <FontAwesome color={color} name={name} size={28} style={styles.icon} />
  );
};
export default TabBarIcon;

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
