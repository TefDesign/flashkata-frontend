import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import HeaderSecondary from "../components/HeaderSecondary";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import useThemedStyles from "../hooks/useThemedStyles";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";

const LoadingScreen = ({ navigation, route }) => {
  const { typeKana, typeFilter, nbSlider } = route.params;

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: theme.spacing.large,
        height: Dimensions.get("window").height,
      },
      logo: {
        marginBottom: "20%",
      },
      title: {
        fontFamily: theme.fonts.staatliches,
        fontSize: theme.fontSize.menu,
        margin: theme.spacing.medium,
        marginBottom: theme.spacing.large,
        color: theme.colors.text,
        textAlign: "center",
      },
    })
  );

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const getCards = async () => {
    try {
      const resp = await fetch(`${API_URL}/cards/getCards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          token: user.token,
          kataType: typeFilter === "learn" ? "all" : typeKana,
          filterType: typeFilter === "learn" ? "neverViewed" : typeFilter,
          nbSlider: typeFilter === "learn" ? 10 : nbSlider,
        }),
      });
      const data = await resp.json();
      console.log("chargement ok : ", data.data);
      setTimeout(() => {
        navigation.navigate("Learn", { cardsDatas: data.data });
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  getCards();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
      </View>
      <Text style={styles.title}>Chargement en cours...</Text>
      <Settings />
    </SafeAreaView>
  );
};

export default LoadingScreen;
