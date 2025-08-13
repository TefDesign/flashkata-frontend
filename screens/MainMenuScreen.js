import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import LogoIcon from "../assets/icons/logo.svg";
import HeaderSecondary from "../components/HeaderSecondary";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import useThemedStyles from "../hooks/useThemedStyles";

const MainMenuScreen = ({ navigation }) => {
  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
      },
      logo: {
        marginBottom: 78,
      },
      menu: {
        fontFamily: theme.fonts.staatliches,
        fontSize: theme.fontSize.menu,
        margin: theme.spacing.medium,
        marginBottom: 5,
        color: theme.colors.text,
      },
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary isArrowBack={false} />
      <View style={styles.logo}>
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
        <Text style={styles.menu}>Tutoriel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("IntroJapanese")}>
        <Text style={styles.menu}>Introduction au japonais</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Hiragana")}>
        <Text style={styles.menu}>Hiragana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Katakana")}>
        <Text style={styles.menu}>Katakana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ReviewAll")}>
        <Text style={styles.menu}>Tout réviser</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Challenge")}>
        <Text style={styles.menu}>Challenge</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Progression")}>
        <Text style={styles.menu}>Progression</Text>
      </TouchableOpacity>
      <Settings />
    </SafeAreaView>
  );
};

export default MainMenuScreen;
