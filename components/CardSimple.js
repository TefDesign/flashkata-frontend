/**
 * composant CardFlip qui intègre la logie d'animation du flip des cartes.
 */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import { getSvgRequire } from "../utils/svgMap";
import { useEffect, useState } from "react";
import useThemedStyles from "../hooks/useThemedStyles";

const CardSimple = (props) => {
  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 1.7,
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
        //backgroundColor: "#ffffff",
      },
      title: {
        fontSize: 300,
        color: "#ffffff",
      },
      text: {
        textAlign: "center",
        marginTop: "auto",
        fontSize: 300,
        marginBottom: 20,
      },
    })
  );

  const { image, name, word, isTuto = false } = props;
  const SvgComponent = getSvgRequire(image);
  const [hasValidated, setHasValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Code pour tester pendant le développement. On supprimera une fois que la logique sera en place.
  useEffect(() => {
    setHasValidated(false);
    setIsCorrect(false);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !hasValidated
            ? theme.colors.backgroundOptions
            : isCorrect && hasValidated
            ? theme.colors.success
            : theme.colors.error,
        },
      ]}
    >
      <View style={styles.content}>
        {SvgComponent && (
          <SvgComponent
            color={
              isTuto ? "#ffffff" : hasValidated ? "#ffffff" : theme.colors.text
            }
            width={300}
            height={300}
          />
        )}
        {name && <Text style={styles.title}>{name}</Text>}
        {word && <Text style={styles.word}>{word}</Text>}
      </View>
    </View>
  );
};

export default CardSimple;