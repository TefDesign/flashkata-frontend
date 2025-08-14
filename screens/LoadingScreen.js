import { StyleSheet, Text, TouchableOpacity, View, Pressable, Dimensions } from "react-native";
import HeaderSecondary from "../components/HeaderSecondary";
import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import useThemedStyles from "../hooks/useThemedStyles";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";



const LoadingScreen = ({  navigation, route }) => {
  
    const { typeKana, typeFilter, nbSlider } = route.params;



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
        marginBottom: "20%",
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
        color: theme.colors.text,
      },
      infoReset: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
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
      progressionContainer: {
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.medium,
        marginTop: theme.spacing.medium,
        height: 70,
        marginTop: 50
      },
      ResetContainer: {
        marginTop: 100,
        width: "100%",
        alignItems: "center",
        gap: theme.spacing.small,
        
      }
    })
  );


  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)


  const getCards = async () => {
    try {

      const resp = await fetch(`${API_URL}/cards/getCards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          token: user.token,
          kataType: typeFilter === 'learn' ? "all" : typeKana,
          filterType: typeFilter === 'learn' ? "neverViewed" : typeFilter,
          nbSlider: typeFilter === 'learn' ? 10 : nbSlider,
        }),
      })
      const data = await resp.json()
      console.log('chargement ok : ', data.data)
        navigation.navigate("Learn", { cardsDatas: data.data } )

      
    } catch (err) {
      console.log(err)
    }

  }

  

  getCards()

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Text style={styles.title}>Chargement en cours...</Text>
      <Settings />
    </SafeAreaView>
  );
};

export default LoadingScreen;

