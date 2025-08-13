import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import RowChallenge from "../components/RowChallenge";
import useThemedStyles from "../hooks/useThemedStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const ScoreScreen = () => {

  const user = useSelector((state) => state.users);

  const [scores, setScores] = useState({
    hiraganaChallenge: {},
    katakanaChallenge: {},
    AllChallenge: {},
  });

  useEffect(() => {
    fetch(`${API_URL}/users/getUser/${user.id}/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setScores({
            hiraganaChallenge: data.user.hiraganaChallenge,
            katakanaChallenge: data.user.katakanaChallenge,
            AllChallenge: data.user.AllChallenge,
          });
        }
      });
  }, []);

  const showChallengeScores = (title, data) => {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      if (value > 0) {
        result.push({ key, value });
      }
    }

    return (
      <View style={styles.challengeResults}>
        <Text style={styles.textLarge}>{title}</Text>

        {result.length === 0 ? (
          <Text style={styles.text}>Pas encore de scores à afficher !</Text>
        ) : (
          result.map(({ key, value }) => (
            <RowChallenge
              key={key}
              time={key}
              nbKana={value}
            />
          ))
        )}
      </View>
    );
  };

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
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
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
          {showChallengeScores("Hiragana", scores.hiraganaChallenge)}
          {showChallengeScores("Katakana", scores.katakanaChallenge)}
          {showChallengeScores("Tous", scores.AllChallenge)}
        </ScrollView>
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default ScoreScreen;
