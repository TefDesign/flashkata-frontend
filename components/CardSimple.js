/**
 * composant CardFlip qui intègre la logie d'animation du flip des cartes.
 */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import { getSvgRequire } from "../utils/svgMap";
import { useEffect, useState } from "react";

const CardSimple = (props) => {

  const { 
    image, 
    name, 
    word, 
    bgColor = "#f0f0f0", 
    isCorrect, 
    isPicked } = props;
  const SvgComponent = getSvgRequire(image);
  
  const [hasValidated, setHasValidated] = useState(false);




  return (
    
    <View style={[
        styles.container,
        {
          borderColor: isPicked ? "transparent" : theme.colors.borderCard,
          backgroundColor: !hasValidated
            ? bgColor
            : isCorrect && hasValidated
            ? theme.colors.success
            : theme.colors.error,
        },
      ]}
    >
      <View style={styles.content}>
        {SvgComponent && (
          <SvgComponent
            color={isPicked ? "#ffffff" : theme.colors.text}
            width={isPicked ? 120 : 80}
            height={isPicked ? 120 : 80}
          />
        )}
        {/* {image && <Text style={[
        styles.title,
        {
          color: isPicked ? "theme.colors.borderCard," : "#ffffff",
          fontSize: isPicked ? 150 : 100,
        },
      ]}>a</Text>} */}
        {/* {word && <Text style={styles.word}>{word}</Text>} */}
      </View>
    </View>
  );
};

export default CardSimple;

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get("window").width / 1.2,
    // height: Dimensions.get("window").height / 1.7,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.borderCard,
    borderWidth: 10,
    borderRadius: theme.borderRadius.card,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: "auto",
    fontSize: 300,
    marginBottom: 20,
  },
});
