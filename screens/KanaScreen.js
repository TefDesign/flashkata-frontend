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
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import { svgMap, getSvgRequire } from "../utils/svgMap";

export default function Syllabaire({ navigation, route }) {

  const { kana, data, index } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [progress, setProgress] = useState([])

  // Fonction pour convertir nom + index en clé SVG
  const getKanaSvgKey = (kanaName, kanaType, index) => {
    const paddedIndex = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
    return `${paddedIndex}-${kanaType}-${kanaName}`;
  };



  const borderColor = (priority, isFavorite) => {
    if (priority > 0.9) {return "#ff0000ff"}
    else if (priority > 0.8) {return "#ff5500ff"}
    else if (priority > 0.7) {return "#ff8400ff"}
    else if (priority > 0.6) {return "#ffb300ff"}
    else if (priority > 0.5) {return "#5c5e00ff"}
    else if (priority > 0.4) {return "#006208ff"}
    else if (priority > 0.3) {return "#059900ff"}
    else if (priority > 0.2) {return "#00bd03ff"}
    else if (priority > 0.1) {return "#38e100ff"}
    else {return "#00bfffff"}
    }
  const opacity = ( nbViews ) => {
    if (nbViews < 1) {return 0.1} 
    else { return 1}
  }
  



    return (
      <Pressable style={[styles.kanaCard, {borderColor: borderColor(priority, isFavorite), opacity : opacity(nbViews), backgroundColor : isFavorite ? "#ffffbcff" : "#f9f9f9"}]}>
        {SvgComponent ? (
          <SvgComponent width={20} height={20} />
        ) : (
          <View style={styles.fallbackContainer}>
            <Text style={styles.kanaText}>{kanaName}</Text>
          </View>
        )}
        <Text style={styles.kanaText}>{kanaName}</Text>
      </Pressable>
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
  gridContainer: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-around',
  },
  kanaCard: {
    width: '18%',
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 1,
    borderWidth: 1.5,
    borderRadius: 8,

  },
  emptyCell: {
    width: '18%',
    aspectRatio: 1,
    margin: 1,
    backgroundColor: "transparent",
  },
  fallbackContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  kanaText: {
    fontSize: 10,
    fontFamily: theme.fonts?.outfit || "System",
    marginTop: 5,
    textAlign: "center",
  },
});
