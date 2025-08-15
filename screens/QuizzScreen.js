import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { API_URL } from "@env";

import useThemedStyles from "../hooks/useThemedStyles";
import LogoIcon from "../assets/icons/logo.svg";
import newRecordGif from "../assets/GIF/newRecordGif.gif";
import newRecordGifWhite from "../assets/GIF/newRecordGifWhite.gif";
import SoundIconDark from "../assets/icons/soundRed.svg";

import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import CardSimple from "../components/CardSimple";

// import { getSvgRequire, svgMap } from "../utils/svgMap";
import { useAudioPlayer } from "expo-audio";
import { getSound } from "../utils/soundsMap.js";
// import { cards } from "../datas/datas";
// import { cards as cardsDatas } from "../datas/datas";

const QuizzScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const cards = params.cards;

  // console.log("cards", cards[0].name)

  const user = useSelector((state) => state.users);

  // console.log("cardsQuizz:", cards[0])

  // On recupère la valeur du slider/timer et si activé de Challenge screen
  const timeoutMinutes = params?.timeoutMinutes ?? 1;
  const limitEnabled = params?.limitEnabled ?? false;
  const challengeType = params?.challengeType;
  const timeReqBody = limitEnabled ? `${timeoutMinutes}min` : null;

  // console.log("challengetypeQuizzz", challengeType)

  // On définit la base des options à faire apparaitre
  const baseOptions = cards.map((item) => item.name);

  // Choix et selection réponses
  const [initialQuizz, setInitialQuizz] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState(baseOptions);
  const [picked, setPicked] = useState(null);
  const isLocked = picked !== null;
  const nextQuizzAuto = limitEnabled ? 300 : 500;

  // Score
  const [score, setScore] = useState(0);
  const [isBestScore, setIsBestScore] = useState(false);
  const [finished, setFinished] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(timeoutMinutes * 60);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // Dark Mode pour anim
  const DarkMode = useSelector((state) => state.users.theme);



  // console.log("FirstCoAnswer", correctAnswer )
  const sourceKana = getSound(correctAnswer); 
  const playerKana = useAudioPlayer(sourceKana);

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        paddingHorizontal: theme.spacing.large,
      },
      logo: {
        top: -20,
        marginBottom: 0,
      },
      ScoreContainer: {
        top: -50,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      instructionsText: {
        marginBottom: 15,
        marginTop: 3,
        fontSize: theme.fontSize.textLarge,
        color: theme.colors.text,
      },
      instructionsTextJap: {
        marginBottom: 10,
        fontSize: theme.fontSize.menu,
        color: theme.colors.text,
      },
      correctAnserText: {
        marginBottom: 10,
        marginTop: 5,
        left: 6,
        fontSize: theme.fontSize.subMenu,
        color: theme.colors.text,
      },
      scoreTimerView: {
        top: -17,
        width: "100%",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      },
      questionNumberText: {
        fontSize: 13,
        marginLeft: 17,
        color: theme.colors.text,
      },
      AnswerContainer: {
        top: limitEnabled ? -58 : -3,
        width: "100%",
        height: "60%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      CardSimpleContainer: {},
      options: {
        gap: "5%",
        width: "49%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      },
      optionsText: {
        color: theme.colors.text,
        fontSize: 30,
        fontFamily: theme.fonts.staatliches,
      },
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.textLarge,
        margin: theme.spacing.medium,
      },
      scoreText: {
        top: -30,
        left: 10,
        marginRight: 20,
        color: theme.colors.text,
      },
      timerTxt: {
        position: "relative",
        right: 10,
        top: -30,
        fontSize: 20,
        color: theme.colors.text,
      },
      SoundIconRed: {
        bottom: limitEnabled ? 4 : -46,
        width: 33,
        height: 20,
        resizeMode: "contain",
      },
      muteText: {
        top: limitEnabled ? -27 : 50,
        color: theme.colors.text,
        fontSize: 30,
        fontFamily: theme.fonts.staatliches,
      },

      // finised
      animNewRecord: {
        top: 233,
        fontSize: 50,
        width: 333,
        height: 200,
        resizeMode: "contain",
        position: "absolute",
        opacity: 0.4,
      },
      BestScoreContainer: {
        top: 70,
      },
      bestScoreText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.text,
      },
      louangesText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.textLarge,
      },
      scoreFinText: {
        marginTop: 33,
        color: theme.colors.text,
        fontSize: theme.fontSize.textLarge,
      },
      btnFin1: {
        bottom: 144,
        margin: theme.spacing.medium,
        color: theme.colors.text,
      },
      txtFin1: {
        fontSize: theme.fontSize.subMenu,
        fontFamily: theme.fonts.staatliches,
        color: theme.colors.text,
      },
    })
  );



  useEffect(() => {
    if (limitEnabled) {
      timeoutRef.current = setTimeout(() => {
        setFinished(true);
      }, timeoutMinutes * 60000);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!limitEnabled || finished) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          setFinished(true);
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [limitEnabled, finished]);

  // Mélanger les options/choix
  function getRandomOptions() {
    const shuffled = [...baseOptions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }

  function newQuestion(resetNumber = false) {
    const opts = getRandomOptions();
    setOptions(opts);
    setCorrectAnswer(opts[Math.floor(Math.random() * opts.length)]);
    setPicked(null);
    setQuestionNumber((n) => (resetNumber ? 1 : n)); // restart
  }

  // Render à l'initialisation la première réponse parmis les opts possibles
  useEffect(() => {
    if (!initialQuizz) {
      setOptions(getRandomOptions());

      const newCorrect =
        baseOptions[Math.floor(Math.random() * baseOptions.length)];
      setCorrectAnswer(newCorrect);
      setOptions(getRandomOptions(newCorrect));

      function getRandomOptions(correct) {
        const otherLetters = baseOptions.filter((l) => l !== correct);
        const shuffledOthers = [...otherLetters].sort(
          () => Math.random() - 0.5
        );
        const randomOthers = shuffledOthers.slice(0, 3); // 3 autres lettres en plus de la bonne réponse
        const finalOptions = [correct, ...randomOthers].sort(
          () => Math.random() - 0.5
        );
        return finalOptions;
      }
    }

    setInitialQuizz(false);
  }, [initialQuizz]);

  console.log("timeLeft", timeLeft);
  // console.log("BestScore", isBestScore);

  useEffect(() => {
    if (finished && limitEnabled) {
      fetch(`${API_URL}/users/challengeScore`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          token: user.token,
          score: score,
          time: timeReqBody,
          challengeType: challengeType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result && data.isNewRecord) {
            console.log("New record!");
            setIsBestScore(true);
          } else if (!data.isNewRecord) {
            setIsBestScore(false);
          }
        });
    }
  }, [finished, limitEnabled]);

  const handlePick = (opt) => {
    if (isLocked) return;
    setPicked(opt);

    if (opt === correctAnswer) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      setPicked(null);
      newQuestion();
      setQuestionNumber((n) => n + 1);
    }, nextQuizzAuto);
  };

  const currentCard = cards.find((c) => c.name === correctAnswer);



  const handleSound = async () => {
    // Avec expo-audio, la position ne se réinitialise pas toute seule :
    // on remet au début puis on joue (cf. note de la doc).
    await playerKana.seekTo(0);
    await playerKana.play();
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderSecondary />
        <View style={styles.logo}>
          <LogoIcon
            width={256}
            height={136}
            style={{ color: theme.colors.text }}
          />
        </View>

        {isBestScore && (
          <View style={styles.BestScoreContainer}>
            <Text style={styles.bestScoreText}></Text>
          </View>
        )}

        {isBestScore && DarkMode === "light" && (
          <Image source={newRecordGif} style={styles.animNewRecord} />
        )}
         {isBestScore && DarkMode === "dark" && (
          <Image source={newRecordGifWhite} style={styles.animNewRecord} />
        )}
        <View style={styles.ScoreContainer}>
          <Text style={styles.instructionsTextJap}>
            {
              challengeType === "hiragana"
                ? isBestScore
                  ? "しん きろく"
                  // 'Nouveau rcord!'
                  : "おめでとう"
                  //'Félicitations!'
                : isBestScore
                ? "シン キロク"
                // 'Nouveau rcord!'
                : "オメデトウ"
                //'Félicitations!'
              
            }
          </Text>
          <Text style={styles.louangesText}>
            {isBestScore ? "Nouveau Record!" : "Félicitations!"}
          </Text>
          <Text style={styles.scoreFinText}>Score : {score}</Text>
        </View>

        <TouchableOpacity
          style={styles.btnFin1}
          onPress={() => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
            setFinished(false);
            setScore(0);
            setQuestionNumber(1);
            setPicked(null);
            setTimeLeft(timeoutMinutes * 60);
            setIsBestScore(false);
            setInitialQuizz(true);
            newQuestion(true);
          }}
        >
          <Text style={styles.txtFin1}>Rejouer</Text>
        </TouchableOpacity>

        <Settings />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={100} height={50}
            style={{ color: theme.colors.text }}
          />
      </View>

      <Text style={styles.instructionsText}>
        {" "}
        Ecoute et trouve le bon {currentCard?.type}{" "}
      </Text>
      <Text style={styles.correctAnserText}>"{correctAnswer}" </Text>

      {limitEnabled && (
        <View style={styles.scoreTimerView}>
          <Text style={styles.scoreText}>Score : {score}</Text>
          <Text style={styles.timerTxt}>{timeLeft}s</Text>
        </View>
      )}

      <View style={styles.AnswerContainer}>
        {options.map((opt, idx) => {
          const card = cards.find((c) => c.name === opt);
          if (!card) return null;
          const isPicked = picked === opt;
          const isCorrect = opt === correctAnswer;
          const bg =
            picked == null
              ? "#f0f0f0"
              : isPicked
              ? isCorrect
                ? "#22c55e"
                : "#ef4444"
              : "#f0f0f0";

          return (
            <TouchableOpacity
              key={opt + "-" + idx}
              // 	opt → le contenu de l’option (ex : "KE" / .name de datas.js)
              //	opt + "-" + idx → crée une nouvelle clef concaténé : opt = "あ", idx = 2, clé => "あ-2"
              style={[
                styles.options,
                {
                  backgroundColor: bg,
                  marginTop: 10,
                  borderRadius: theme.borderRadius.card,
                },
              ]}
              activeOpacity={0.9}
              onPress={() => handlePick(opt)}
            >
              <CardSimple
                {...card}
                bgColor={bg}
                isPicked={isPicked}
                isCorrect={isCorrect}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.mute}
        onPress={() => {
          console.log("Mute");
          handleSound();
        }}
      >
          <SoundIconDark source={SoundIconDark} style={styles.SoundIconRed} />
      </TouchableOpacity>
      <Settings />
    </SafeAreaView>
  );
};

export default QuizzScreen;

// Animation Mauvaise / Bonne réponse:

// const scale = useRef(new Animated.Value(1)).current;
// const shake = useRef(new Animated.Value(0)).current;
// const flash = useRef(new Animated.Value(0)).current;

// const shakeX = shake.interpolate({
//   inputRange: [0, 1, 2, 3, 4],
//   outputRange: [0, -8, 8, -8, 0],
// });

//   <TouchableOpacity
//   key={opt  + "-" + idx}
// // 	opt → le contenu de l’option (ex : "KE" / .name de datas.js)
// //	opt + "-" + idx → crée une nouvelle clef concaténé : opt = "あ", idx = 2, clé => "あ-2"
//   style={[styles.options, { backgroundColor: bg, marginTop: 10, borderRadius: theme.borderRadius.card, }]}
//   activeOpacity={0.9}
//   onPress={() => handlePick(opt)}
// >
// <Animated.View
//     style={{
//       flex: 1,
//       alignSelf: isPicked ? "stretch" : "stretch",
//       transform: isPicked
//         ? [{ scale }, { translateX: shakeX }]
//         : [{ scale: 1 }, { translateX: 0 }],
//     }}>
//   <CardSimple
//   {...card}
//   bgColor={bg}
//   isPicked={isPicked}
//   isCorrect={isCorrect}
//   />
//   </Animated.View>
// </TouchableOpacity>
