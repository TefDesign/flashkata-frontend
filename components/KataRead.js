/**
 * Module d'apprentissage de lecture des kata.
 */

import { StyleSheet, Text, View } from "react-native";
import { getSvgRequire } from "../utils/svgMap";

const KataRead = (props) => {
  const { image, text, word = null } = props;
  const SvgComponent = getSvgRequire(image);

  return (
    <View>
      {SvgComponent && <SvgComponent width={300} height={300} />}
      <Text>{text}</Text>
      {word && <Text style={styles.word}>{word}</Text>}
    </View>
  );
};

export default KataRead;

const styles = StyleSheet.create({
  word: {
    fontSize: 20,
    fontWeight: "bold",
    fontVariant: "italic",
  },
});
