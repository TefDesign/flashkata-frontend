/**
 * Module d'apprentissage d'écriture des kata.
 */

import { StyleSheet, Text, View } from "react-native";
import { getSvgRequire } from "../utils/svgMap";

import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Svg, { Path, Image as SvgImage } from "react-native-svg";

const KataWrite = (props) => {
  const { image } = props;
  const SvgComponent = getSvgRequire(image);

  const [paths, setPaths] = useState([]); // Tableau de chemins
  const [currentPath, setCurrentPath] = useState(""); // Chemin en cours

  // Gesture.Pan() permet de détecter les gestes de glissement. Donc on créé un geste de type Pan.
  // onStart, onUpdate et onEnd sont des callbacks pour gérer le début, la mise à jour et la fin du geste
  console.log("toto");
  const panGesture = Gesture.Pan()
    .onStart((e) => {
      // e.x et e.y sont les coordonnées du point de contact du geste
      // Le M dans le d de Path signifie "Move to", donc on déplace le curseur à la position initiale du geste
      setCurrentPath(`M${e.x},${e.y}`);
    })
    .onUpdate((e) => {
      // on récupère le tracé précédent via prev et on ajoute le nouveau tracé grâce à L (Line to).
      console.log(e);
      setCurrentPath((prev) => `${prev} L${e.x},${e.y}`);
    })
    .onEnd(() => {
      // Là on lève le doigt, donc on ajoute le tracé final au tableau des chemins
      setPaths((prev) => [...prev, currentPath]);
      setCurrentPath("");
    });

  return (
    <View style={styles.container}>
      {/* Active la détection du geste panGesture. */}
      <GestureDetector gesture={panGesture}>
        {/* C'est la zone du dessin */}
        <Svg height={300} width={300}>
          {/* Image hiragana en filigrane */}
          {SvgComponent && (
            <SvgComponent width={300} height={300} style={{ opacity: ".05" }} />
          )}
          {/* Tous les tracés précédents */}
          {paths.map((d, i) => (
            <Path key={i} d={d} stroke="black" strokeWidth="14" fill="none" />
          ))}
          {/* Tracé en cours */}
          {currentPath !== "" && (
            <Path d={currentPath} stroke="black" strokeWidth="14" fill="none" />
          )}
        </Svg>
      </GestureDetector>

      <TouchableOpacity
        style={{
          marginBottom: 40,
          backgroundColor: "#DD3B3B",

          padding: 10,
          borderRadius: 8,
        }}
        onPress={() => {
          setPaths([]); // Réinitialise le tableau des chemins
          setCurrentPath(""); // Réinitialise le chemin en cours
        }}
      >
        <Text style={{ color: "#ffffff" }}>Clean</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KataWrite;
