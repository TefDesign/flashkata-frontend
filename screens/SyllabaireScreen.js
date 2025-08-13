import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import { svgMap, getSvgRequire } from "../utils/svgMap";
import HeaderSecondary from "../components/HeaderSecondary";
import useThemedStyles from "../hooks/useThemedStyles";


export default function Syllabaire({ navigation, route }) {


  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        paddingHorizontal: theme.spacing.large,
        height: Dimensions.get("window").height,
      },
      title: {
        fontFamily: theme.fonts.staatliches,
        fontSize: theme.fontSize.menu,
        margin: theme.spacing.medium,
        marginBottom: theme.spacing.large,
        color: theme.colors.text,
      },
      kanaCard: {
        width: '19%',
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        margin: 2,
        borderWidth: 1.5,
        borderRadius: 8,
      },
      emptyCell: {
        width: '19%',
        aspectRatio: 1,
        margin: 2,
        backgroundColor: "transparent",
      },
      fallbackContainer: {
        alignItems: "center",
        justifyContent: "center",
      },
      kanaText: {
        color: theme.colors.text,
        fontSize: 15,
        fontFamily: theme.fonts?.outfit || "System",
        marginTop: 5,
        textAlign: "center",
      },
      gridContainer: {
        padding: 5,
      },
    })
  );

  const { type } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [progress, setProgress] = useState([])

  // Fonction pour convertir nom + index en clé SVG
  const getKanaSvgKey = (kanaName, kanaType, index) => {
    const paddedIndex = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
    return `${paddedIndex}-${kanaType}-${kanaName}`;
  };

  const getProgress = async () => {
    try {
      const resp = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${type}`)
      let data = await resp.json()
      data = data.data

      // Ordre syllabaire
      const traditionalOrder = [
        'a', 'i', 'u', 'e', 'o',
        'ka', 'ki', 'ku', 'ke', 'ko',
        'sa', 'shi', 'su', 'se', 'so',
        'ta', 'chi', 'tsu', 'te', 'to',
        'na', 'ni', 'nu', 'ne', 'no',
        'ha', 'hi', 'fu', 'he', 'ho',
        'ma', 'mi', 'mu', 'me', 'mo',
        'ya', null, 'yu', null, 'yo',
        'ra', 'ri', 'ru', 're', 'ro',
        'wa', null, null, null, 'wo',
        'n', null, null, null, null // Compléter la grille 5x11
      ];

      // Réorganiser les données selon l'ordre traditionnel
      const sortedProgress = traditionalOrder.map(kanaName => {
        if (!kanaName) return null; // Case vide

        return data.find(item => {
          const name = item.katakanaId?.name || item.hiraganaId?.name;
          return name === kanaName;
        }) || null; // null si kana non trouvé
      });
      setProgress(sortedProgress)
    } catch (error) {
      console.log('Erreur fetch:', error)
    }
  };

  const borderColor = (priority, isFavorite) => {
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

  useEffect(() => {
    getProgress()
  }, [type]) // Se déclenche quand 'type' change


  // Fonction de rendu pour chaque item de la grille
  const renderKanaItem = ({ item, index }) => {
    // Si item est null, afficher une case vide
    if (!item) {
      return <View style={styles.emptyCell} />;
    }
    const { priority, isFavorite, nbViews } = item

    const kanaName = item.katakanaId?.name || item.hiraganaId?.name;
    const kanaType = item.katakanaId ? "katakana" : "hiragana";
    const svgKey = getKanaSvgKey(kanaName, kanaType, index);
    const SvgComponent = getSvgRequire(svgKey);

    return (
      <Pressable
        style={
          [styles.kanaCard,
          {
            borderColor: borderColor(priority, isFavorite),
            opacity: opacity(nbViews), backgroundColor: isFavorite ? "#ffea0085" : "#f9f9f95d"
          }]}
        onPress={() => navigation.navigate("KanaScreen", { type: item.katakanaId ? "katakana" : "hiragana", kana: item, index: index, getProgress })}

      >
        {SvgComponent ? (
          <SvgComponent width={30} height={30} />
        ) : (
          <View style={styles.fallbackContainer}>
            <Text style={styles.kanaText}>{kanaName}</Text>
          </View>
        )}
        <Text style={styles.kanaText}>{kanaName}</Text>
      </Pressable>
    );
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
      <Text style={styles.title}>{type}</Text>
      <FlatList
        data={progress}
        renderItem={renderKanaItem}
        numColumns={5}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

