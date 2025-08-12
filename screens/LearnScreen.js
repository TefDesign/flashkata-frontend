import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";

import useThemedStyles from "../hooks/useThemedStyles";

import HeaderSecondary from "../components/HeaderSecondary";
import Card from "../components/Card.js";
import KataRead from "../components/KataRead.js";
import KataWrite from "../components/KataWrite.js";

import { useSharedValue } from "react-native-reanimated";
import Swiper from "react-native-deck-swiper";

import { cards as cardsDatas } from "../datas/datas.js";
import { useAudioPlayer } from "expo-audio";
import { getSound } from "../utils/soundsMap.js";

const LearnScreen = () => {
  // Créer un tableau de SharedValues, une pour chaque carte pour le flip individuel
  const isFlippedArray = cardsDatas.map(() => useSharedValue(false));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const swiperRef = useRef(null);

  const playerShuffleCard = useAudioPlayer(
    require("../assets/effects/shuffle.wav")
  );
  const playerFlipCard = useAudioPlayer(require("../assets/effects/flip.mp3"));
  const playerSwipeCard = useAudioPlayer(
    require("../assets/effects/swipe.mp3")
  );

  useEffect(() => {
    playerShuffleCard.seekTo(0);
    playerShuffleCard.play();
  }, []);

  // Source = mp3 de la carte courante (pas de hook ici)
  const current = cardsDatas[currentCardIndex];
  const sourceKana = getSound(current.sound); // require("../assets/sounds/xxx.mp3")

  const playerKana = useAudioPlayer(sourceKana);

  const handlePress = () => {
    isFlippedArray[currentCardIndex].value =
      !isFlippedArray[currentCardIndex].value;
    playerFlipCard.seekTo(0);
    playerFlipCard.play();
  };

  const handleSound = async () => {
    // Avec expo-audio, la position ne se réinitialise pas toute seule :
    // on remet au début puis on joue (cf. note de la doc).
    await playerKana.seekTo(0);
    await playerKana.play();
  };

  const doneCard = (cardIndex) => {
    console.log("Done", cardIndex);
    playerSwipeCard.seekTo(0);
    playerSwipeCard.play();
    isFlippedArray[cardIndex].value = false;
  };
  const keepCard = (cardIndex) => {
    console.log("Keep card", cardIndex);
    playerSwipeCard.seekTo(0);
    playerSwipeCard.play();
    isFlippedArray[cardIndex].value = false;
  };

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        paddingHorizontal: theme.spacing.large,
        height: Dimensions.get("window").height,
      },
      logo: {
        marginBottom: 40,
      },
      title: {
        fontFamily: theme.fonts.staatliches,
        fontSize: theme.fontSize.menu,
        margin: theme.spacing.medium,
        marginBottom: theme.spacing.large,
        color: theme.colors.text,
      },
      textLarge: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.textLarge,
        alignSelf: "flex-start",
        color: theme.colors.text,
      },
      button: {
        backgroundColor: "#7c99b7ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 15,
      },
      flipCard: {
        flex: 1,
        backfaceVisibility: "hidden",
      },
      buttonBottomContainer: {
        flex: 1,
        position: "absolute",
        bottom: 50,
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width,
      },
    })
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <Swiper
        ref={swiperRef}
        cards={cardsDatas}
        renderCard={(card, cardIndex) => {
          return (
            <Card
              key={cardIndex}
              kata={<KataRead {...card} />}
              isFlipped={isFlippedArray[cardIndex]}
              {...card}
            />
          );
        }}
        onSwiped={(cardIndex) => {
          console.log("cardIndex : ", cardIndex);
          /* 
            On réinit l'index quand on arrive à la fin de la pile.
            Exemple si 5 cartes, on arrive au 4ème index :
            C'est égale à (4+1) % 5 = 5 % 5 = 0 
             */
          setCurrentCardIndex((currentCardIndex + 1) % cardsDatas.length);
        }}
        disableLeftSwipe={true}
        disableRightSwipe={true}
        onSwipedTop={(cardIndex) => doneCard(cardIndex)}
        onSwipedBottom={(cardIndex) => keepCard(cardIndex)}
        stackSize={5}
        infinite={true}
        backgroundColor="transparent"
        cardVerticalMargin={170}
        cardHorizontalMargin={
          Dimensions.get("window").width / 2 -
          Dimensions.get("window").width / 1.2 / 2
        }
        stackSeparation={25}
      />
      <View style={styles.buttonBottomContainer}>
        <TouchableOpacity
          style={styles.button}
          title="Flip card"
          onPress={handlePress}
        >
          <Text>Flip card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="Sound"
          onPress={handleSound}
        >
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LearnScreen;
