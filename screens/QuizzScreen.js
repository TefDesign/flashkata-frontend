import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import theme from "../styles/themeLight";
import useThemedStyles from "../hooks/useThemedStyles";
import LogoIcon from "../assets/icons/logo.svg";
import ArrowBackIcon from "../assets/icons/arrowback.svg";


import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import CardSimple from "../components/CardSimple";

import { getSvgRequire } from "../utils/svgMap";
// import { cards } from "../datas/datas";
// import { cards as cardsDatas } from "../datas/datas";



const QuizzScreen = () => {

  

  const navigation = useNavigation();
  const { params } = useRoute();

  const cards = params.cards


  console.log("cardsQuizz:", cards[0])

  // On recupère la valeur du slider/timer et si activé de Challenge screen
  const timeoutMinutes = params?.timeoutMinutes ?? 1;
  const limitEnabled = params?.limitEnabled ?? false;
  const TOTAL_MS = timeoutMinutes * 60_000;

// On définit la base des options à faire apparaitre
  // const [cards, setCards] = useState(cards);
  const baseOptions = cards.map(item => item.name);


  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState(baseOptions); 
  const [picked, setPicked] = useState(null);
  const isLocked = picked !== null;

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const totalTimerRef = useRef(null);
  const tickRef = useRef(null);
  const [nbQuestionPerQuizz, setNbQuestionPerQuizz] = useState(10); // a chercher dans le fetch
  const [remainingMs, setRemainingMs] = useState(TOTAL_MS);

  const nextQuizzAuto = limitEnabled ? 300 : 500;

  // const scale = useRef(new Animated.Value(1)).current;
  // const shake = useRef(new Animated.Value(0)).current;
  // const flash = useRef(new Animated.Value(0)).current;

  const startTotalTimer = () => {
    if (totalTimerRef.current) clearTimeout(totalTimerRef.current);
    if (tickRef.current) clearInterval(tickRef.current);

    setRemainingMs(TOTAL_MS);
    if (!limitEnabled) return;

    const start = Date.now();
    // deadline
    totalTimerRef.current = setTimeout(() => {
      setFinished(true);
    }, TOTAL_MS);
    // affichage du countdown
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const left = Math.max(TOTAL_MS - elapsed, 0);
      setRemainingMs(left);
      if (left <= 0) {
        clearInterval(tickRef.current);
      }
    }, 200);
  };

  // const shakeX = shake.interpolate({
  //   inputRange: [0, 1, 2, 3, 4],
  //   outputRange: [0, -8, 8, -8, 0],
  // });

  function newQuestion(resetNumber = false) {
    const opts = getRandomOptions();
    setOptions(opts);
    setCorrectAnswer(opts[Math.floor(Math.random() * opts.length)]);
    setPicked(null);
    setQuestionNumber(n => resetNumber ? 1 : n); // restart
  }

  function getRandomOptions() {
    const shuffled = [...baseOptions].sort(() => Math.random() - 0.5);
// console.log("shuffle", shuffled)
    return shuffled.slice(0, 4);
  }



  useEffect(() => {
    startTotalTimer();
    return () => {
      if (totalTimerRef.current) clearTimeout(totalTimerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [timeoutMinutes, limitEnabled]);

  useEffect(() => {
    setOptions(getRandomOptions());

    const newCorrect = baseOptions[Math.floor(Math.random() * baseOptions.length)];
    setCorrectAnswer(newCorrect);
    setOptions(getRandomOptions(newCorrect));
    
// console.log("newCorrect", newCorrect)

    function getRandomOptions(correct) {
      const otherLetters = baseOptions.filter(l => l !== correct);
      const shuffledOthers = [...otherLetters].sort(() => Math.random() - 0.5);
      const randomOthers = shuffledOthers.slice(0, 3); // 3 autres lettres en plus de la bonne réponse
      const finalOptions = [correct, ...randomOthers].sort(() => Math.random() - 0.5);
// console.log("finalOptions", finalOptions)
      return finalOptions;
    }

  }, []);

  const handlePick = (opt) => {
    if (isLocked) return;
    setPicked(opt);

// console.log("Choix:", opt, " -> ", opt === correctAnswer ? "Good" : "Nop");

    if (opt === correctAnswer){
      setScore((s) => s + 1)
   
      // Animated.parallel([
      //   Animated.sequence([
      //     Animated.spring(scale, { toValue: 1.08, friction: 3, tension: 120, useNativeDriver: true }),
      //     Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }),
      //   ]),
      //   Animated.sequence([
      //     Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
      //     Animated.timing(flash, { toValue: 0, duration: 180, useNativeDriver: true }),
      //   ]),
      // ])
      // .start();
  //   } else {
  //     shake.setValue(0);
  //       Animated.parallel([
  //       Animated.timing(shake, { toValue: 4, duration: 240, useNativeDriver: true }),
  //       Animated.sequence([
  //       Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
  //       Animated.timing(flash, { toValue: 0, duration: 180, useNativeDriver: true }),
  //   ]),
  // ]).start();
  //   }
    }

    setTimeout(() => {
      if (questionNumber >= nbQuestionPerQuizz){
        setFinished(true)
        return;
      }
      setPicked(null);
      newQuestion();
      setQuestionNumber((n) => n + 1);
    }, nextQuizzAuto);
    };


  // utilitaires d'affichage timer + type card affichée
  const mm = Math.floor(remainingMs / 60000);
  const ss = Math.floor((remainingMs % 60000) / 1000);
  const mmss = `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

  const currentCard = cards.find(c => c.name === correctAnswer);

    if (finished) {
      return (
        <SafeAreaView style={styles.container}>

          <HeaderSecondary />
          <View style={styles.logo}>
              <LogoIcon width={100} height={50} />
          </View>

          <View style={styles.ScoreContainer}>
            <Text style={styles.instructionsText}>Quiz finito</Text>
            <Text style={styles.instructionsText}>Score : {score} / {nbQuestionPerQuizz}</Text>
          </View>

          <TouchableOpacity 
          style={styles.btnFin1}
          onPress={() => {
                setFinished(false);
                setScore(0);
                setQuestionNumber(1);
                setPicked(null);
                startTotalTimer(); 
                }}>
              <Text style={styles.txtFin1}>Même série</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.btnFin2}
          onPress={() => {
                setFinished(false);
                setScore(0);
                setQuestionNumber(1);
                setPicked(null);
                newQuestion(true);
                startTotalTimer();
                }}>
              <Text style={styles.txtFin2}>Nouvelle série</Text>
          </TouchableOpacity>
          

        <Settings/>
        </SafeAreaView>
      );
    }


  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={100} height={50} />
      </View>

      <Text style={styles.instructionsText}> Ecoute et trouve le bon {currentCard?.type} </Text>
      <Text style={styles.correctAnserText}>"{correctAnswer}" </Text>
      
      
      <View style={styles.questionNumberView}>
        <Text style={styles.questionNumberText}>
          {questionNumber} / {nbQuestionPerQuizz}
        </Text>
        {limitEnabled && (
                <Text style={styles.timerTxt}>{mmss}</Text>
            )}
        <Text style={styles.scoreText}>Score : {score}</Text>
        
      </View>

      <View style={styles.AnswerContainer}>
        {options.map((opt, idx) => {
          const card = cards.find(c => c.name === opt);
          if (!card) return null;
          const isPicked = picked === opt;
          const isCorrect = opt === correctAnswer;
          const bg =
            picked == null
              ? "#f0f0f0"
              : isPicked
              ? isCorrect ? "#22c55e" : "#ef4444"
              : "#f0f0f0";

          return (
            <TouchableOpacity
              key={opt  + "-" + idx} 
  // 	opt → le contenu de l’option (ex : "KE" / .name de datas.js)
	//	opt + "-" + idx → crée une nouvelle clef concaténé : opt = "あ", idx = 2, clé => "あ-2"
              style={[styles.options, { backgroundColor: bg, marginTop: 10 }]}
              activeOpacity={0.9}
              onPress={() => handlePick(opt)}
            >
            {/* <Animated.View
                style={{
                  flex: 1,
                  alignSelf: isPicked ? "stretch" : "stretch",
                  transform: isPicked
                    ? [{ scale }, { translateX: shakeX }]
                    : [{ scale: 1 }, { translateX: 0 }],
                }}> */}
              <CardSimple 
              {...card} 
              bgColor={bg}
              isPicked={isPicked}
              isCorrect={isCorrect}
              />
              {/* </Animated.View> */}
            </TouchableOpacity>
          );
        })}
      </View>



      <TouchableOpacity
        style={styles.mute}
        onPress={() => {  console.log("Mute") }}
        >
        <Text style={styles.muteText}>
          LissenneIcon
        </Text>
      </TouchableOpacity>
    <Settings />
    </SafeAreaView>
  );
};

export default QuizzScreen;

const styles = StyleSheet.create({
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
  timerTxt:{
    position: "relative",
    left: 10,
    top: -7,
    fontSize: 20,
  },
  ScoreContainer:{
    top: -50,
    width: "100%",
    height:"100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionsText:{
    marginBottom: 15,
    marginTop: 3,
    fontSize: 19
  },
  correctAnserText:{
    marginBottom: 10,
    marginTop: -5,
    fontSize: 23
  },
  questionNumberView: {
    top: -33,
    width: "100%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionNumberText: {
    fontSize: 13,
    marginLeft: 17,
  },
  AnswerContainer:{
    top: -73,
    width: "100%",
    height:"60%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  CardSimpleContainer:{

  },
  options:{
    gap: "5%",
    width: "49%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", 
  },
  optionsText:{
    color: "#000000",
    fontSize: 30,
    fontFamily: theme.fonts.staatliches,
  },
  text: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.textLarge,
    margin: theme.spacing.medium,
  },
  scoreText:{
    marginRight: 20,
  },
  mute:{

  },
  muteText: {
    top: -27,
    color: "#000000",
    fontSize: 30,
    fontFamily: theme.fonts.staatliches,
  },

  // finised

  btnFin1:{
    bottom: 300,
    color: "#000000",
  },
  txtFin1: {
    fontSize: 23,
    fontFamily: theme.fonts.staatliches,
  },
  btnFin2:{
    bottom: 290,
    color: "#000000",
  },
  txtFin2: {
    fontSize: 23,
    fontFamily: theme.fonts.staatliches,
  },
});