import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import Separator from "../components/Separator";
import SliderRange from "../components/SliderRange";
import SwitchOption from "../components/SwitchOption";
import { useState } from "react";

const ChallengeScreen = () => {
  const [activeLimit, setActiveLimit] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Challenge</Text>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Hiragana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Katakana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Tout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Score")}>
        <Text style={styles.subMenu}>Score</Text>
      </TouchableOpacity>
      <Separator />
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Activer la limite d'apprentissage</Text>
        <SwitchOption value={activeLimit} onChange={setActiveLimit} />
        {activeLimit && <SliderRange />}
      </View>
      <Button title="Lancer le challenge" />
      <Settings />
    </SafeAreaView>
  );
};

export default ChallengeScreen;

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
  subMenu: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.subMenu,
    margin: theme.spacing.small,
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.text,
  },
  sliderContainer: {
    alignItems: "center",
    gap: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
});
