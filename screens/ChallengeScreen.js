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
import { cards } from "../datas/datas";



const ChallengeScreen = ({ navigation }) => {
  const [activeLimit, setActiveLimit] = useState(false);
  const [timeoutMinutes, setTimeoutMinutes] = useState(1);

  const [challengeType, setChallengeType] = useState(null); // Stocker si hira | kata / hira / tout selected
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
      subMenu: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.subMenu,
        margin: theme.spacing.small,
        color: theme.colors.text,
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



console.log("Leeeeeeeet's euh go")
    setErrMsg("");
    setLoading(true);
    try {

      const nbSlider = 1;
      const filterType = "all";

      const id = user.id
      const token = user.token

console.log("Ca c'est toi:", id, token)

      if (!id || !token) {
        setErrMsg("Utilisateur non connecté (id/token manquants).");
        setLoading(false);
        return;
      }

console.log("You shaaaall not pass")

      const body = {
        nbSlider: nbSlider,
        kataType: "hiragana",
        filterType: filterType,
        id: id,
        token: token,
      };


console.log("beau dix", )


      const res = await fetch(`${API_URL}/cards/getCards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

console.log("raie the", res)

      const json = await res.json();

      // if (!json?.result) {
      //   setErrMsg(json?.message || "Erreur inconnue sur /getCards");
      //   setLoading(false);
      //   return;
      // }

console.log("json", json)

      if (json) {
        navigation.navigate("Quizz", {
          timeoutMinutes,
          limitEnabled: activeLimit,
          challengeType,
          cards: json.data,
        });

      }
console.log("Ji Zone", cards.length)

      const cardsFromApi = Array.isArray(cards) ? cards : [];
      // (Optionnel) normalisation: s'assurer d'avoir .name
      const normalized = cardsFromApi.map(k => ({
        ...k,
        name: k.name ?? k.romanji ?? k.label ?? k._id,   
      }));

      console.log( "normalized" , normalized.length )



      setLoading(false);
      navigation.navigate("Quizz", {
        timeoutMinutes,
        limitEnabled: activeLimit,
        challengeType,
        cards: normalized,
      });

      console.log("Pk un nom quand on a Panzani?")

    } catch (e) {
      setErrMsg("Impossible de récupérer les cartes.");
      setLoading(false);
      console.warn(e);
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
      <Text style={styles.title}>Challenge</Text>
      <TouchableOpacity onPress={() => setChallengeType("hiragana")}>
        <Text style={styles.subMenu}>Hiragana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setChallengeType("katakana")}>
        <Text style={styles.subMenu}>Katakana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setChallengeType("all")}>
        <Text style={styles.subMenu}>Tout</Text>
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
            {startChallenge(),
            console.log("meeeeeeeeep")}
          }
        />
      <Settings />
    </SafeAreaView>
  );
};

export default ChallengeScreen;
