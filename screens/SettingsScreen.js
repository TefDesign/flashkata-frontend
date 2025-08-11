import { StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
// import themeLight from "../styles/themeLight";
// import themeDark from "../styles/themeDark";
import LogoIcon from "../assets/icons/logo.svg";
import LightIcon from "../assets/icons/light.svg";
import DarkIcon from "../assets/icons/dark.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSecondary from "../components/HeaderSecondary";
import SwitchOption from "../components/SwitchOption";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, logout } from "../reducers/users";
import Button from "../components/Button";

const SettingsScreen = () => {
  const [activeDarkMode, setActiveDarkMode] = useState(false);
  const [disabledListening, setDisabledListening] = useState(false);

  const dispatch = useDispatch();
  // const userTheme = useSelector((state) => state.users.theme);

  // const isDarkMode = userTheme === "dark";

  // const theme = isDarkMode ? themeDark : themeLight;

  // const handleThemeChange = (newValue) => {
  //   const newTheme = newValue ? "dark" : "light";
  //   dispatch(changeTheme({ theme: newTheme }));
  // };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Options</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.text}>Dark mode</Text>
          <View style={styles.switchContainer}>
            <LightIcon width={30} height={30} />
            <SwitchOption value={activeDarkMode} onChange={setActiveDarkMode} />
            <DarkIcon width={30} height={30} />
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
              value={disabledListening}
              onChange={setDisabledListening}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
  },
  logo: {
    marginBottom: 40,
  },
  title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.menu,
    margin: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.text,
  },
  smallText: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
    opacity: 0.4,
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
