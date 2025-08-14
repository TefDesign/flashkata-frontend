import { StyleSheet, Text, TouchableOpacity, View, Pressable, Dimensions } from "react-native";
import HeaderSecondary from "../components/HeaderSecondary";
import Gauge from "../components/Gauge";
import Button from "../components/Button";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import useThemedStyles from "../hooks/useThemedStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "@env";

const ProgressionScreen = ({ navigation }) => {
    const [rez, setRez] = useState(false);


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
        marginBottom: "20%",
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
        color: theme.colors.text,
      },
      infoReset: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
        color: theme.colors.text,
      },
      scrollContainer: {
        flex: 1,
        width: "100%",
        maxHeight: "55%",
      },
      sectionText: {
        width: "100%",
        gap: theme.spacing.small,
        marginBottom: theme.spacing.large,
      },
      progressionContainer: {
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.medium,
        marginTop: theme.spacing.medium,
        height: 70,
        marginTop: 50
      },
      ResetContainer: {
        marginTop: 100,
        width: "100%",
        alignItems: "center",
        gap: theme.spacing.small,
        
      }
    })
  );


  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [hiraganaProgress, setHiraganaProgress] = useState(0)
  const [katakanaProgress, setKatakanaProgress] = useState(0)
  const [dataKata, setDataKatakana] = useState()
  const [dataHira, setDataHiragana] = useState()

  const calculProgress = (kana) => {
    if (kana.nbViews > 0 && kana.priority < 0.25) {return 1}
    else if (kana.nbViews > 0 && kana.priority < 0.5) {return 0.75}
    else if (kana.nbViews > 0 && kana.priority < 0.75) {return 0.5}
    else {return 0}
  }

  const getProgress = async () => {
    try {


      const respKatakana = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${"katakana"}`)
      const dataKatakana = await respKatakana.json()
      const respHiragana = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${'hiragana'}`)
      const dataHiragana = await respHiragana.json()

      setHiraganaProgress(dataHiragana.data.reduce((acc, kana) => acc + calculProgress(kana), 0))
      setKatakanaProgress(dataKatakana.data.reduce((acc, kana) => acc + calculProgress(kana), 0))

      setDataKatakana(dataKatakana.data)
      setDataHiragana(dataHiragana.data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getProgress()
  }, [])




const reset = async() => {
  try {
    if (!rez) {
      setRez(true);
      setTimeout(() => setRez(false), 5000);
      return;
    }

    const resp = await fetch(`${API_URL}/progress/reset`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        id: user.id,
        token: user.token
      })
    });
    const data = await resp.json();
    if (data.result) {
      getProgress();
      setRez(false);
    } else {
      console.log('Erreur lors du reset:', data.message);
    }
  } catch (error) {
    console.log('Erreur fetch:', error);
  }
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
      <Text style={styles.title}>Progression</Text>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "hiragana", data: dataHira })}>
        <View style={styles.progressionContainer}>
          <Text style={styles.textLarge}>Hiragana</Text>
          <Gauge progress={hiraganaProgress} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "katakana", data: dataKata })}>
        <View style={styles.progressionContainer}>
          <Text style={styles.textLarge}>Katakana</Text>
          <Gauge progress={katakanaProgress} />
        </View>
      </Pressable>
      <View style={styles.ResetContainer}>
        <Button title={!rez ? "Réinitialiser" : "Êtes-vous sûr de vouloir réinitialiser vos statistiques ?"} onPress={reset} style={{ backgroundColor: !rez ? "#ff0000ff" : "#440000ff" }} />
        <Text style={styles.infoReset}>Vos statistiques seront perdues</Text>
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default ProgressionScreen;

