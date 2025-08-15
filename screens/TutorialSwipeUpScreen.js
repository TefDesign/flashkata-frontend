import { Dimensions, StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo.svg";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import CardSimple from "../components/CardSimple";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TutorialSwipeUpScreen = ({ navigation }) => {
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
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: 18,
        alignSelf: "center",
        color: theme.colors.text,
        position: "absolute",
        bottom: 30,
        width: "80%",
        textAlign: "center",
        paddingHorizontal: theme.spacing.small,
        paddingTop: theme.spacing.large,
      },
      button: {
        margin: theme.spacing.small,
        width: "60%",
      },
      tutoContainer: {
        position: "relative",
        width: "100%",
        alignItems: "center",
        marginBottom: theme.spacing.medium,
      },
      arrowTop: {
        position: "absolute",
        top: "27%",
      },
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary isAvatar={false} />
      <View style={styles.logo}>
        <LogoIcon
          width={186}
          height={66}
          style={{ color: theme.colors.text }}
        />
      </View>

      <View style={styles.tutoContainer}>
        <View style={styles.card}>
          <CardSimple image="01-hiragana-a" isTuto />
        </View>
        <Text style={styles.text}>
          Swiper en haut si vous considérez la carte apprise.
        </Text>
      </View>
      <FontAwesomeIcon
        icon={faArrowUp}
        size={80}
        color={theme.colors.text}
        style={styles.arrowTop}
      />

      <Settings />
      <View style={styles.button}>
        <Button
          title="À vous de jouer !"
          onPress={() => navigation.navigate("MainMenu")}
        />
      </View>
    </SafeAreaView>
  );
};

export default TutorialSwipeUpScreen;

const styles = StyleSheet.create({});
