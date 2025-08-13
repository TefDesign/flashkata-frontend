import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList
} from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import { svgMap, getSvgRequire } from "../utils/svgMap";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function KanaScreen({ navigation, route }) {

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
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon width={200} height={200} />
      </View>

      <View style={styles.cardContainer}>
        <View style={[styles.kanaCard, {
          borderColor: borderColor(priority),
          opacity: opacity(nbViews),
          backgroundColor: favorite ? "#ffffbcff" : "#f9f9f9"
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
          <Text>Vous avez vue la carte : <Text style={{ color: "blue" }}>{nbViews}</Text> fois</Text>
          <Text>Vous avez répondu correctement : <Text style={{ color: "green" }}>{nbCorrect}</Text> fois</Text>
          <Text>Vous avez vue la carte : <Text style={{ color: "red" }}>{nbWrong}</Text> fois</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: 'space-around',
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
    position: 'relative', // Pour permettre le positionnement absolu de l'étoile
  },
  starContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  fallbackContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  kanaText: {
    fontSize: 40,
    fontFamily: theme.fonts?.outfit || "System",
    marginTop: 5,
    textAlign: "center",
  },
  subContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    margin: 1,
    borderWidth: 1,
    borderRadius: 10,
  }
});
