import { StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import HeaderSecondary from "../components/HeaderSecondary";
import Gauge from "../components/Gauge";
import Button from "../components/Button";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import { useDispatch, useSelector } from "react-redux";

const ProgressionScreen = ({ navigation }) => {


  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Progression</Text>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "hiragana" })}>
      <View style={styles.progressionContainer}>
        <Text style={styles.text}>Hiragana</Text>
        <Gauge progress={75} />
      </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "katakana" })}>
      <View style={styles.progressionContainer}>
        <Text style={styles.text}>Katakana</Text>
        <Gauge progress={11} />
      </View>
      </Pressable>     
      <View style={styles.ResetContainer}>
        <Button title="Réinitialiser" />
        <Text style={styles.infoReset}>Vos statistiques seront perdues</Text>
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default ProgressionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
  },
  logo: {
    marginBottom: 78,
  },
  title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.menu,
    margin: theme.spacing.medium,
    marginBottom: 5,
  },
  progressionContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.textLarge,
    margin: theme.spacing.medium,
  },
  ResetContainer: {
    marginTop: 60,
    width: "100%",
    alignItems: "center",
    gap: theme.spacing.small,
  },
  infoReset: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.text,
  },
});
