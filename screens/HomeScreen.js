import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.users);
  if (!user.token) {
    navigation.navigate("SignIn");
    return null;
  } else {
    navigation.navigate("MainMenu");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon width={284} height={150} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.title}>S'enregistrer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.title}>Se Connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DiscoverApp")}>
        <Text style={styles.text}>Découvrir l'application</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 67,
  },
  title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.title,
    margin: theme.spacing.medium,
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.textLarge,
    margin: theme.spacing.medium,
  },
});
