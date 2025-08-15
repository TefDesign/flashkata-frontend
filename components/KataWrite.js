/**
 * Module d'apprentissage d'écriture des kata.
 */

import { StyleSheet, Text, View } from "react-native";
import { getSvgRequire } from "../utils/svgMap";

import { useState } from "react";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Svg, { Path, Image as SvgImage } from "react-native-svg";
import { runOnJS } from "react-native-reanimated";

const KataWrite = (props) => {
  const { image } = props;
  const SvgComponent = getSvgRequire(image);

  const [paths, setPaths] = useState([]); // Tableau de chemins
  const [currentPath, setCurrentPath] = useState(""); // Chemin en cours

  // Gesture.Pan() permet de détecter les gestes de glissement. Donc on créé un geste de type Pan.
  // onStart, onUpdate et onEnd sont des callbacks pour gérer le début, la mise à jour et la fin du geste

  const panGesture = Gesture.Pan()
    .shouldCancelWhenOutside(false)
    .onStart((e) => {
      // e.x et e.y sont les coordonnées du point de contact du geste
      // Le M dans le d de Path signifie "Move to", donc on déplace le curseur à la position initiale du geste
      console.log("pouet");

      const startPath = `M${e.x},${e.y} L${e.x + 0.1},${e.y + 0.1}`;
      runOnJS(setCurrentPath)(startPath);
    })
    .onUpdate((e) => {
      // on récupère le tracé précédent via prev et on ajoute le nouveau tracé grâce à L (Line to).

      const segment = `L${e.x},${e.y}`;
      const newPath =
        currentPath === "" ? `M${e.x},${e.y}` : `${currentPath} ${segment}`;
      runOnJS(setCurrentPath)(newPath);
    })
    .onEnd(() => {
      // Là on lève le doigt, donc on ajoute le tracé final au tableau des chemins

      if (typeof currentPath === "string" && currentPath.trim() !== "") {
        const newPaths = [...paths, currentPath];
        runOnJS(setPaths)(newPaths);
      }
      runOnJS(setCurrentPath)("");
    });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        {/* Active la détection du geste panGesture. */}
        <GestureDetector gesture={panGesture}>
          {/* C'est la zone du dessin */}
          <Svg height={300} width={300}>
            {/* Image hiragana en filigrane */}
            {SvgComponent && (
              <SvgComponent
                width={300}
                height={300}
                style={{ opacity: 0.05 }}
                preserveAspectRatio="none"
                pointerEvents="none"
              />
            )}
            {/* Tous les tracés précédents */}

            {paths.map((d, i) => {
              if (typeof d !== "string" || !d.startsWith("M")) {
                console.warn("Invalid path", d);
                return null;
              }
              return (
                <Path
                  key={i}
                  d={d}
                  stroke="black"
                  strokeWidth="14"
                  fill="none"
                  pointerEvents="none"
                />
              );
            })}
            {/* Tracé en cours */}
            {currentPath !== "" && (
              <Path
                d={currentPath}
                stroke="black"
                strokeWidth="14"
                fill="none"
                pointerEvents="none"
              />
            )}
          </Svg>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: "#c44343",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KataWrite;
