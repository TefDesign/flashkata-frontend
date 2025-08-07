/**
 * composant CardFlip qui intègre la logie d'animation du flip des cartes.
 */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Card = (props) => {
  const { kata, isFlipped, direction = "y", duration = 500 } = props;

  const isDirectionX = direction === "x";

  const ImageCardContent = (content) => {
    return <View style={styles.content}>{content}</View>;
  };
  const TextCardContent = (content) => {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>{content}</Text>
      </View>
    );
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    //interpolate permet de synchroniser 2 valeurs pour une animation. Converti la val bool en Number et si 1 on passe à 180 progressivement
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    // withTiming permet une animation fluide
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[flipCardStyles.regularCard, regularCardAnimatedStyle]}
      >
        {ImageCardContent(kata)}
      </Animated.View>
      <Animated.View
        style={[flipCardStyles.flippedCard, flippedCardAnimatedStyle]}
      >
        {TextCardContent(kata.props?.name)}
      </Animated.View>
    </Animated.View>
  );
};

export default Card;

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  flippedCard: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
});

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 1.7,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.borderCard,
    borderWidth: 10,
    backgroundColor: theme.colors.backgroundOptions,
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
  },
  text: {
    textAlign: "center",
    marginTop: "auto",
    fontSize: 300,
    marginBottom: 20,
  },
});
