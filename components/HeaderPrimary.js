import { View, TouchableOpacity, StyleSheet } from 'react-native';
import theme from "../styles/themeLight";
import ToriiIcon from "../assets/icons/torii.svg";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import LogoIcon from "../assets/icons/logo.svg";

const HeaderPrimary = () => {
  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <ArrowBackIcon width={40} height={40} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <LogoIcon width={80} height={80} />
        </View>

        <TouchableOpacity>
          <ToriiIcon width={34} height={34} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HeaderPrimary;