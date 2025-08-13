/**
 * composant CardFlip qui intègre la logie d'animation du flip des cartes.
 */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import useThemedStyles from "../hooks/useThemedStyles";
import { getSound } from "../utils/soundsMap";

const Card = (props) => {
  const { kata, flipped = false, direction = "y", duration = 500 } = props;
  console.log("Cards.js : flipped => ", flipped);

  // chaque carte crée SON hook une seule fois
  const isFlipped = useDerivedValue(() => (flipped ? 1 : 0));
  const isDirectionX = direction === "x";

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      card: {
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 1.7,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.colors.borderCard,
        borderWidth: 10,
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.card,
      },
      content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        fontSize: 300,
      },
      text: {
        textAlign: "center",
        fontSize: 300,
        color: theme.colors.text,
        fontFamily: theme.fonts.outfitRegular,
      },
    })
  );

  const ImageCardContent = (content) => {
    return <View style={styles.card}>{content}</View>;
  };
  const TextCardContent = (content) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{content}</Text>
      </View>
    );
  };

  const animatedCard = (inputRange, outputRange) => {
    return useAnimatedStyle(() => {
      const spinValue = interpolate(
        Number(isFlipped.value),
        inputRange,
        outputRange
      );

      const rotateValue = withTiming(`${spinValue}deg`, { duration });

      return {
        transform: [
          isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        ],
      };
    });
  };

  const regularCardAnimatedStyle = animatedCard([0, 1], [0, 180]);
  const flippedCardAnimatedStyle = animatedCard([0, 1], [180, 360]);

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
