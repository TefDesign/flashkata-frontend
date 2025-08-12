import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../styles/themeLight";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSecondary from "../components/HeaderSecondary";
import LogoIcon from "../assets/icons/logo.svg";
import Button from "../components/Button";

export default function DiscoverAppScreen({ navigation }) {
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
      <Text style={styles.title}>Découverte</Text>
      <Text style={styles.text}>
        Vous allez pouvoir découvrir l'application en apprenant les 10 premiers
        Hiraganas.
      </Text>
      <Text style={styles.text}>
        Attention : Votre progression ne sera pas enregistrée. Si vous souhaitez
        ne pas perdre votre progression, retourner sur l'écran d'accueil pour
        vous enregistrer
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("IntroJapanese")}>
        <Text style={styles.subMenu}>Introduction au japonais</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
        <Text style={styles.subMenu}>Tutoriel</Text>
      </TouchableOpacity>
      <View style={{ marginTop: theme.spacing.large * 2, width: "100%" }}>
        <Button title="Lancer la découverte" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
    height: Dimensions.get("window").height,
  },
  logo: {
    marginBottom: 40,
  },
  title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.menu,
    margin: theme.spacing.medium,
    marginBottom: theme.spacing.large,
    color: theme.colors.text,
  },
  subMenu: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.subMenu,
    alignSelf: "flex-start",
    color: theme.colors.text,
    marginTop: theme.spacing.medium,
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.text,
    alignSelf: "flex-start",
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
});
