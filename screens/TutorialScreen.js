import { Dimensions, StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../assets/icons/logo.svg";
import flip from "../assets/icons/flip";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import HeaderPrimary from "../components/HeaderPrimary";
import CardSimple from "../components/CardSimple";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "../components/ButtonIcon";

const TutorialScreen = ({ navigation }) => {
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
        marginBottom: 30,
      },
      textLine: {
        alignSelf: "center",
        position: "absolute",
        textAlign: "center",
        justifyContent: "center",
        paddingTop: theme.spacing.large,
        flexDirection: "row",
        flexWrap: "wrap",
      },
      text: {
        color: theme.colors.text,
        fontFamily: theme.fonts.outfitRegular,
        fontSize: 18,
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
          <CardSimple number="01" type="hiragana" name="a" isTuto />
        </View>
        <View style={styles.textLine}>
          <Text style={styles.text}>Vous pourrez cliquer sur l'icone </Text>
          <FontAwesomeIcon
            icon={faRepeat}
            size={30}
            color={theme.colors.primary}
            style={{ marginHorizontal: 10, marginTop: -5 }}
          />
          <Text style={styles.text}>pour voir la réponse.</Text>
        </View>
      </View>
      <ButtonIcon icon={flip} />
      <View style={styles.button}>
        <Button
          title="Suite du tutoriel"
          onPress={() => navigation.navigate("TutorialSwipeBottom")}
        />
      </View>
      <Settings />
    </SafeAreaView>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({});
