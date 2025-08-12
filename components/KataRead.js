/**
 * Module d'apprentissage de lecture des kata.
 */

import { StyleSheet, Text, View } from "react-native";
import { getSvgRequire } from "../utils/svgMap";
import useThemedStyles from "../hooks/useThemedStyles";

const KataRead = (props) => {
  const { image, name, word = null } = props;

  const SvgComponent = getSvgRequire(image);

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      word: {
        fontSize: 20,
        fontWeight: "bold",
        fontVariant: "italic",
        color: theme.colors.text,
      },
      name: {
        fontSize: 20,
        fontFamily: theme.fonts.outfitRegular,
        color: theme.colors.text,
      },
    })
  );

  return (
    <View>
      {SvgComponent && (
        <SvgComponent
          width={300}
          height={300}
          style={{ color: theme.colors.text }}
        />
      )}
      {/* 
      {name && <Text style={styles.name}>{name}sss</Text>}
      {word && <Text style={styles.word}>{word}aaa</Text>} */}
    </View>
  );
};

export default KataRead;
