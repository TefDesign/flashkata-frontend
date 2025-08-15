import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import { getSvgRequire } from "../utils/svgMap";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import HeaderSecondary from "../components/HeaderSecondary";
import useThemedStyles from "../hooks/useThemedStyles";
import { HIRAGANA_SOUNDS } from "../utils/soundsMap";
import ButtonIcon from "../components/ButtonIcon";
import soundRed from "../assets/icons/soundRed";
import { useAudioPlayer } from "expo-audio";
import { getSound } from "../utils/soundsMap.js";

export default function KanaScreen({ navigation, route }) {

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
        marginBottom: 20,
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
        alignSelf: "flex-end",
        color: theme.colors.text,
        margin: 10,
        paddingRight: 50
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
        height: 60,
        marginTop: 20
      },
      kanaCard: {
        width: '60%',
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        margin: 1,
        borderWidth: 3,
        borderRadius: 20,
        marginTop: '20%',
        marginBottom: "10%",
        position: 'relative',
      },
      fallbackContainer: {
        alignItems: "center",
        justifyContent: "center",
      },
      kanaText: {
        color: theme.colors.text,
        fontSize: 20,
        fontFamily: theme.fonts?.outfit || "System",
        marginTop: 5,
        textAlign: "center",
      },
      starContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      cardContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 20,
      },
    })
  );


  const { kana, type, index, getProgress } = route.params;

  const { priority, isFavorite, nbViews, nbWrong, nbCorrect } = kana
  const [favorite, setFavorite] = useState(isFavorite)

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [progress, setProgress] = useState([])

  // Fonction pour convertir nom + index en clé SVG
  const getKanaSvgKey = (kanaName, kanaType, index) => {
    const paddedIndex = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
    return `${paddedIndex}-${kanaType}-${kanaName}`;
  };

  const kanaName = kana.katakanaId?.name || kana.hiraganaId?.name;
  const kanaType = kana.katakanaId ? "katakana" : "hiragana";
  const svgKey = getKanaSvgKey(kanaName, kanaType, index);
  const SvgComponent = getSvgRequire(svgKey);


    const sourceKana = getSound(kanaName); 
    const playerKana = useAudioPlayer(sourceKana);

    const handleSound = async () => {
    // Avec expo-audio, la position ne se réinitialise pas toute seule :
    // on remet au début puis on joue (cf. note de la doc).
    await playerKana.seekTo(0);
    await playerKana.play();
  };

  const borderColor = (priority) => {
    if (priority > 0.9) { return "#ff0000ff" }
    else if (priority > 0.8) { return "#ff5500ff" }
    else if (priority > 0.7) { return "#ff8400ff" }
    else if (priority > 0.6) { return "#ffb300ff" }
    else if (priority > 0.5) { return "#5c5e00ff" }
    else if (priority > 0.4) { return "#006208ff" }
    else if (priority > 0.3) { return "#059900ff" }
    else if (priority > 0.2) { return "#00bd03ff" }
    else if (priority > 0.1) { return "#38e100ff" }
    else { return "#00bfffff" }
  }
  const opacity = (nbViews) => {
    if (nbViews < 1) { return 0.1 }
    else { return 1 }
  }

  const makeFavorite = async () => {
    try {
      console.log('aaa')
      const resp = await fetch(`${API_URL}/progress/kataProgress/modify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: user.token,
          userId: user.id,
          katakana: type === "katakana" ? kana.katakanaId : kana.hiraganaId,
          isFavorite: !favorite
        })
      })
      const data = await resp.json()
      console.log('recu : ', data)
      setFavorite(data.data.isFavorite)
      console.log(data.data.isFavorite)
      getProgress()
    } catch (err) {
      console.log(err)
    }

  }


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

      <View style={styles.cardContainer}>
        <View style={[styles.kanaCard, {
          borderColor: borderColor(priority),
          opacity: opacity(nbViews),
          backgroundColor: favorite ? "#ffff0087" : "#f9f9f96c"
        }]}>
          {/* Étoile de favori en position absolue */}
          {
            <View style={styles.starContainer}>
              <Pressable onPress={() => makeFavorite()}>
                <FontAwesomeIcon
                  icon={faStar}
                  size={40}
                  color={favorite ? "#FFD700" : "#bababaff"}
                />
              </Pressable>
            </View>
          }

          {SvgComponent ? (
            <SvgComponent width={100} height={100} />
          ) : (
            <View style={styles.fallbackContainer}>
              <Text style={styles.kanaText}>{kanaName}</Text>
            </View>
          )}
          <Text style={styles.kanaText}>{kanaName}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textLarge}>Vue : <Text style={{ color: "blue" }}>{nbViews}</Text> fois</Text>
          <Text style={styles.textLarge}>Correcte : <Text style={{ color: "green" }}>{nbCorrect}</Text> fois</Text>
          <Text style={styles.textLarge}>Erreur : <Text style={{ color: "red" }}>{nbWrong}</Text> fois</Text>
        </View>
          <ButtonIcon icon={soundRed} onPress={handleSound} />
      </View>
    </SafeAreaView>
  );
};
