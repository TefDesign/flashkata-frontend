import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import RowChallenge from "../components/RowChallenge";

const ScoreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Score</Text>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.challengeResults}>
            <Text style={styles.textLarge}>Hiragana</Text>
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
          </View>
          <View style={styles.challengeResults}>
            <Text style={styles.textLarge}>Katakana</Text>
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
          </View>
          <View style={styles.challengeResults}>
            <Text style={styles.textLarge}>Tous</Text>
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
            <RowChallenge time="0" nbKana="0" />
          </View>
        </ScrollView>
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  },
  textLarge: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.textLarge,
    alignSelf: "flex-start",
  },
  scrollContainer: {
    flex: 1, // Prend l'espace disponible
    width: "100%",
    maxHeight: "50%", // Limite la hauteur maximale
  },
  challengeResults: {
    width: "100%",
    gap: theme.spacing.small,
    marginBottom: theme.spacing.large,
  },
});
