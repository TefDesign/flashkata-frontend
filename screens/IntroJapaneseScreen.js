import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo.svg";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";

const IntroJapaneseScreen = () => {
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
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
        alignSelf: "flex-start",
        color: theme.colors.text,
      },
      scrollContainer: {
        flex: 1,
        width: "100%",
        maxHeight: "55%",
      },
      sectionText: {
        width: "100%",
        gap: theme.spacing.small,
        marginBottom: theme.spacing.large,
      },
    })
  );

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
      <Text style={styles.title}>Un peu de lexique</Text>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Syllabaires</Text>
            <Text style={styles.text}>
              Le japonais utilise deux syllabaires : le hiragana et le katakana.
              Chacun est composé de 46 signes de base, représentant des
              syllabes, qui peuvent être modifiées pour produire d’autres sons
              (dakuten, handakuten, yōon).
            </Text>
            <Text style={styles.text}>
              Ces syllabaires permettent d’écrire la langue japonaise de façon
              phonétique et sont essentiels pour la lecture et l’écriture. Dans
              les textes, ils sont souvent combinés aux kanji : le hiragana sert
              aux particules grammaticales et aux mots d’origine japonaise,
              tandis que le katakana est utilisé pour les mots étrangers et
              certaines catégories spécifiques.
            </Text>
            <Text style={styles.text}>
              La maîtrise de ces deux systèmes constitue la première étape
              incontournable dans l’apprentissage du japonais.
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Hiragana</Text>
            <Text style={styles.text}>
              Le hiragana est l’un des deux syllabaires japonais. Il sert
              principalement à écrire les mots d’origine japonaise et les
              particules grammaticales.
            </Text>
            <Text style={styles.text}>
              Il est composé de 46 signes de base, chacun représentant une
              syllabe. Ces signes peuvent être modifiés avec des marques
              (dakuten ゛ ou handakuten ゜) pour former de nouveaux sons, ou
              combinés (yōon) pour créer des syllabes comme きゃ (kya).
            </Text>
            <Text style={styles.text}>
              On utilise souvent le hiragana pour écrire les mots qui n’ont pas
              de kanji, ou dont les kanji sont rares ou difficiles à lire.
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Katakana</Text>
            <Text style={styles.text}>
              Le katakana est l’autre syllabaire japonais. Il sert
              principalement à transcrire les mots d’origine étrangère, les noms
              de marques, les onomatopées, ainsi que certains termes
              scientifiques et techniques.
            </Text>
            <Text style={styles.text}>
              Comme le hiragana, il comprend 46 signes de base avec les mêmes
              possibilités de modification (dakuten, handakuten, yōon).
            </Text>
            <Text style={styles.text}>
              Il se distingue par un tracé plus anguleux et simple, ce qui le
              rend visuellement différent du hiragana.
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Kanji</Text>
            <Text style={styles.text}>
              Les kanji sont des caractères d’origine chinoise intégrés à
              l’écriture japonaise. Ils représentent des mots, des concepts ou
              des idées, et peuvent avoir plusieurs lectures selon le contexte
              (onyomi — lecture d’origine chinoise — et kunyomi — lecture
              d’origine japonaise).
            </Text>
            <Text style={styles.text}>
              Les kanji sont souvent combinés avec les kana pour former des
              phrases complètes.
            </Text>
            <Text style={styles.text}>
              La maîtrise des kanji est essentielle pour lire la majorité des
              textes en japonais, car ils constituent une part importante du
              vocabulaire écrit.
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Kana</Text>
            <Text style={styles.text}>
              Le terme "kana" désigne collectivement les deux syllabaires
              japonais, hiragana et katakana.
            </Text>
            <Text style={styles.text}>
              Les kana sont utilisés pour écrire les sons de la langue japonaise
              et sont souvent accompagnés de kanji pour former des mots
              complets.
            </Text>
            <Text style={styles.text}>
              La connaissance des kana est essentielle pour lire et écrire en
              japonais.
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text style={styles.textLarge}>Kata</Text>
            <Text style={styles.text}>
              Dans le contexte de l’application, “kata” est un terme inventé,
              inspiré du mot japonais désignant des formes codifiées en arts
              martiaux.
            </Text>
            <Text style={styles.text}>
              Ici, il symbolise la répétition et la pratique régulière
              nécessaires pour maîtriser les syllabaires, à la manière d’un
              entraînement.
            </Text>
          </View>
        </ScrollView>
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default IntroJapaneseScreen;
