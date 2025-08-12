import { StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import HeaderSecondary from "../components/HeaderSecondary";
import Gauge from "../components/Gauge";
import Button from "../components/Button";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "@env";

const ProgressionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [hiraganaProgress, setHiraganaProgress] = useState(0)
  const [katakanaProgress, setKatakanaProgress] = useState(0)
  const [dataKata, setDataKatakana] = useState()
  const [dataHira, setDataHiragana] = useState()


    const getProgress = async () => {
      try {
        console.log("debut", API_URL)
        const respKatakana = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${"katakana"}`)
        const dataKatakana = await respKatakana.json()
        const respHiragana = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${'hiragana'}`)
        const dataHiragana = await respHiragana.json()

        setHiraganaProgress(dataHiragana.data.reduce((acc, kana) => {acc + ( kana.nbViews > 0 ? 1 : 0)} , 0))
        setKatakanaProgress(dataKatakana.data.reduce((acc, kana) => acc + ( kana.nbViews > 0 ? 1 : 0) , 0))

        setDataKatakana(dataKatakana.data)
        setDataHiragana(dataHiragana.data)

      } catch (err) {
        console.log(err)
      }
    
    }

    useEffect(() => {
      getProgress()
      katakanaProgress
    }, [])

  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Progression</Text>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "hiragana" , data : dataHira})}>
      <View style={styles.progressionContainer}>
        <Text style={styles.text}>Hiragana</Text>
        <Gauge progress={hiraganaProgress} />
      </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Syllabaire", { type: "katakana" , data : dataKata })}>
      <View style={styles.progressionContainer}>
        <Text style={styles.text}>Katakana</Text>
        <Gauge progress={katakanaProgress} />
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
