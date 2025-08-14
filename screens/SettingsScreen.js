import { StyleSheet, Text, View } from "react-native";

import themeLight from "../styles/themeLight";
import themeDark from "../styles/themeDark";
import LogoIcon from "../assets/icons/logo.svg";
import LightIcon from "../assets/icons/light.svg";
import DarkIcon from "../assets/icons/dark.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSecondary from "../components/HeaderSecondary";
import SwitchOption from "../components/SwitchOption";
import Button from "../components/Button";

import { useDispatch, useSelector } from "react-redux";
import { changeTheme, logout, disabledListening } from "../reducers/users";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector((state) => state.users.theme);
  const userListening = useSelector(
    (state) => state.users.hasDisabledListening
  );

  const isDarkMode = userTheme === "dark";
  const theme = isDarkMode ? themeDark : themeLight;
  const styles = makeStyles(theme);

  const handleThemeChange = (newValue) => {
    dispatch(changeTheme({ theme: newValue ? "dark" : "light" }));
  };

  const handleDisabledListening = (newValue) => {
    dispatch(disabledListening(newValue));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
      </View>
      <Text style={styles.title}>Options</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.text}>Dark mode</Text>
          <View style={styles.switchContainer}>
            <LightIcon
              width={30}
              height={30}
              style={{ color: theme.colors.lightIcon }}
            />
            <SwitchOption value={isDarkMode} onChange={handleThemeChange} />
            <DarkIcon
              width={30}
              height={30}
              style={{ color: theme.colors.darkIcon }}
            />
          </View>
        </View>
        <View style={styles.option}>
          <View>
            <Text style={styles.text}>Désactiver l'écoute</Text>
            <Text style={styles.smallText}>
              L’apprentissage par le son ne sera pas proposé
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <SwitchOption
              value={userListening}
              onChange={handleDisabledListening}
            />
          </View>
        </View>
        <View>
          <Button title="Se déconnecter" onPress={() => dispatch(logout())} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingHorizontal: theme.spacing.large,
    },
    logo: {
      marginBottom: 40,
      color: theme.colors.text,
    },
    title: {
      fontFamily: theme.fonts.staatliches,
      fontSize: theme.fontSize.menu,
      margin: theme.spacing.medium,
      marginBottom: theme.spacing.large,
      color: theme.colors.text,
    },
    text: {
      fontFamily: theme.fonts.outfitRegular,
      fontSize: theme.fontSize.text,
      color: theme.colors.text,
    },
    smallText: {
      fontFamily: theme.fonts.outfitRegular,
      fontSize: theme.fontSize.small,
      color: theme.colors.text,
      opacity: 0.4,
      flexWrap: "wrap",
      width: "90%",
    },
    optionsContainer: {
      gap: theme.spacing.medium,
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.colors.backgroundOptions,
      borderRadius: theme.borderRadius.base,
      padding: theme.spacing.medium,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });

export default SettingsScreen;
