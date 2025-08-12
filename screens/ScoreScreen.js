import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import RowChallenge from "../components/RowChallenge";
import useThemedStyles from "../hooks/useThemedStyles";

const ScoreScreen = () => {
  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
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
      textLarge: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.textLarge,
        alignSelf: "flex-start",
        color: theme.colors.text,
      },
      scrollContainer: {
        flex: 1,
        width: "100%",
        maxHeight: "50%",
      },
      challengeResults: {
        width: "100%",
        gap: theme.spacing.small,
        marginBottom: theme.spacing.large,
      },
    })
  );

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
