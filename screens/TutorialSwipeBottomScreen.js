import { Dimensions, StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo.svg";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import CardSimple from "../components/CardSimple";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const TutorialSwipeBottomScreen = ({ navigation }) => {
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
        fontSize: theme.fontSize.text,
        alignSelf: "flex-start",
        color: theme.colors.text,
        position: "absolute",
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
      },
      card: {
        opacity: 0.2,
      },
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary isAvatar={false}/>
      <View style={styles.logo}>
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
      </View>

      <View style={styles.tutoContainer}>
      <View style={styles.card}>
        <CardSimple image="01-hiragana-a"/>
      </View>
        <Text style={styles.text}>Swiper la  carte vers le bas pour continuer à l'apprendre.</Text>
      </View>
      <FontAwesomeIcon
        icon={faArrowDown}
        size={80}
        color={theme.colors.text}
        style={{ position: "absolute", top: "56%" }}
      />

      <Settings />
      <View style={styles.button}>
        <Button
          title="Suite du tutoriel"
          onPress={() => navigation.navigate("TutorialSwipeUp")}
        />
      </View>
    </SafeAreaView>
  );
};

export default TutorialSwipeBottomScreen;

const styles = StyleSheet.create({});