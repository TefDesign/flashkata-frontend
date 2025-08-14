import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

import SliderRange from "../components/SliderRange";
import SwitchOption from "../components/SwitchOption";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import Separator from "../components/Separator";
import Button from "../components/Button";

import LogoIcon from "../assets/icons/logo.svg";

import useThemedStyles from "../hooks/useThemedStyles";
// import { cards } from "../datas/datas";


const ChallengeScreen = ({ navigation }) => {


  const [activeLimit, setActiveLimit] = useState(false);
  const [timeoutMinutes, setTimeoutMinutes] = useState(1);

  const [challengeType, setChallengeType] = useState(null); // Stocker si hira | kata / hira / tout selected
  const [isClickedHira, setIsClickedHira] = useState(false); 
  const [isClickedKata, setIsClickedKata] = useState(false);
  const [isClickedAll, setIsClickedAll] = useState(false);  


  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const user = useSelector((state) => state.users);

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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
        color: theme.colors.text,
      },
      subMenuHira: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.subMenu,
        margin: theme.spacing.small,
        color: challengeType && isClickedHira ? "#DD3B3B" : "#000000",
        marginBottom: 5,
        textAlign: "center",
      },
      subMenuKata: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.subMenu,
        margin: theme.spacing.small,
        color: challengeType && isClickedKata ? "#DD3B3B" : "#000000",
        marginBottom: 5,
        textAlign: "center",
      },
      subMenuAll: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.subMenu,
        margin: theme.spacing.small,
        color: challengeType && isClickedAll ? "#DD3B3B" : "#000000",
        marginBottom: 5,
        textAlign: "center",
      },
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
        color: theme.colors.text,
      },
      sliderContainer: {
        alignItems: "center",
        gap: theme.spacing.large,
        marginBottom: theme.spacing.large,
      },
    })
  );

  const startChallenge = async () => {

    if(hiraActive || kataActive || allActive){
      console.log("Leeeeeeeet's euh go")
    setErrMsg("");
    setLoading(true);
    try {

      const nbSlider = 40;
      const filterType = "onlyViewed";
      const kataType = challengeType;
      const id = user.id
      const token = user.token
      const isDevMode = false

// console.log("Ca c'est toi:", id, token)

      if (!id || !token) {
        setErrMsg("Utilisateur non connecté (id/token manquants).");
        setLoading(false);
        return;
      }

// console.log("You shaaaall not pass")

      const body = {
        nbSlider: nbSlider,
        kataType,
        filterType: filterType,
        id: id,
        token: token,
        isDevMode: isDevMode,
      };

console.log("kataType", kataType)
console.log("beau dix", body)


      const res = await fetch(`${API_URL}/cards/getCards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

// console.log("raie the", res)

      const json = await res.json();

// console.log("json", json.data)

      if (json) {
        navigation.navigate("Quizz", {
          timeoutMinutes,
          limitEnabled: activeLimit,
          cards: json.data,
          challengeType: challengeType
        });

      }

// console.log( "cardsFetched" , json )

      const cardsWithImageKey = json.data.map(card => ({
        ...card,
        imageKey: `${card.number}-${card.type}-${card.name}`
        // "10-hirgana-su"
      }));

      const cardsFromApi = Array.isArray(cards) ? cards : [];
      // normalisation: s'assurer d'avoir .name
      const normalized = cardsFromApi.map(k => ({
        ...k,
        name: k.name ?? k.romanji ?? k.label ?? k._id,   
      }));

console.log( "normalized" , normalized[0] )



      setLoading(false);
      navigation.navigate("Quizz", {
        timeoutMinutes,
        limitEnabled: activeLimit,
        cards: normalized,
        cards: cardsWithImageKey,
        challengeType: challengeType
      });

    } catch (e) {
      setErrMsg("Impossible de récupérer les cartes.");
      setLoading(false);
      console.warn(e);
    }
    }

    else { alert("Merci de sélectionner un type de challenge") }


  };

  const hiraActive = challengeType === 'hiragana';
  const kataActive = challengeType === 'katakana';
  const allActive  = challengeType === 'all';

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
      <Text style={styles.title}>Challenge</Text>
      <TouchableOpacity 
        disabled={challengeType !== null && !hiraActive}
        onPress={() => {
          setChallengeType(hiraActive ? null : 'hiragana')
          setIsClickedHira(hiraActive ? false : true)
      }}
      style={[styles.subMenuHira, 
      hiraActive && { color: "#DD3B3B" },
      (kataActive || allActive) && { 
        color: theme.colors.text,
        opacity: 0.17
      }
      ]}>

        <Text style={styles.subMenuHira}>Hiragana</Text>

      </TouchableOpacity>

      <TouchableOpacity 
          disabled={challengeType !== null && !kataActive}
          onPress={() => {
          setChallengeType(kataActive ? null : 'katakana')
          setIsClickedKata(kataActive ? false : true)
          }}
          style={[styles.subMenuKata, 
            kataActive && { color: "#DD3B3B" },
            (hiraActive || allActive) && { 
              color: theme.colors.text,
              opacity: 0.17
            }
            ]}>
        <Text  style={[styles.subMenuKata]}>Katakana</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          disabled={challengeType !== null && !allActive}
          onPress={() => {
            setChallengeType(allActive ? null : 'all')
            setIsClickedAll(allActive ? false : true)
          }}
          style={[styles.subMenuKata, 
            allActive && { color: "#DD3B3B" },
            (kataActive || hiraActive) && { 
              color: theme.colors.text,
              opacity: 0.17
            }
            ]}
        >
        <Text style={[styles.subMenuAll]}>Tout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Score")}>
        <Text style={styles.subMenu}>Score</Text>
      </TouchableOpacity>
      <Separator />
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Activer le chrono</Text>
        <SwitchOption value={activeLimit} onChange={setActiveLimit} />
        {activeLimit &&
          <SliderRange 
            mode="time" 
            value={timeoutMinutes} 
            onChange={setTimeoutMinutes} 
            />}
      </View>
      <Button
          title="Lancer le challenge"
          onPress={() => 
            {startChallenge()}
          }
        />
      <Settings />
    </SafeAreaView>
  );
};

export default ChallengeScreen;