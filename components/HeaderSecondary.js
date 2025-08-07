import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import theme from "../styles/themeLight";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import Avatar from './Avatar';

const HeaderSecondary = ({ isAvatar = true }) => {
  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <ArrowBackIcon width={40} height={40} />
        </TouchableOpacity>

        {isAvatar && <Avatar size={40} />}
      </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    width: Dimensions.get('window').width,
  },
});

export default HeaderSecondary;