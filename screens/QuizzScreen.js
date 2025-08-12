import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import HeaderSecondary from "../components/HeaderSecondary";
import Button from "../components/Button";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";

const QuizzScreen = () => {

  const navigation = useNavigation();

  const baseOptions = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];


  const [options, setOptions] = useState(baseOptions); 
  const [picked, setPicked] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [nbQuestionPerQuizz, setNbQuestionPerQuizz] = useState(10)
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const isLocked = picked !== null;

  function newQuestion(resetNumber = false) {
    const opts = getRandomOptions();
    setOptions(opts);
    setCorrectAnswer(opts[Math.floor(Math.random() * opts.length)]);
    setPicked(null);
    setQuestionNumber(n => resetNumber ? 1 : n); // restart
  }

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function getRandomOptions() {
    const shuffled = [...baseOptions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }

  useEffect(() => {
    setOptions(getRandomOptions());
  }, []);

  const nextQuizzAuto = 600;

  const handlePick = (opt) => {
    if (isLocked) return;
    setPicked(opt);

    console.log("Choix:", opt, " -> ", opt === correctAnswer ? "Good" : "Nop");

    if (opt === correctAnswer){
      setScore((s) => s + 1)
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

      <Text style={styles.instructionsText}> Ecoute et trouve le bon kata </Text>
      <Text style={styles.correctAnserText}> à trouver "{correctAnswer}" </Text>
      
      <View style={styles.questionNumberView}>
        <Text style={styles.questionNumberText}>
          {questionNumber} / {nbQuestionPerQuizz}
        </Text>
        <Text style={styles.scoreText}>Score : {score}</Text>
      </View>

      <View style={styles.AnswerContainer}>
        {options.map((opt) => {
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
              key={opt}
              style={[styles.options, { backgroundColor: bg, marginTop: 10 }]}
              activeOpacity={0.9}
              onPress={() => handlePick(opt)}
            >
              <Text style={styles.optionsText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>



      <TouchableOpacity
        style={styles.mute}
        onPress={() => {  console.log("Mute") }}
        >
        <Text style={styles.muteText}>
          chuuuuuut
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: theme.spacing.large,
  },
  logo: {
    top: -20,
    marginBottom: 0,
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