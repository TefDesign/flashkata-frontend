import { StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";
import useThemedStyles from "../hooks/useThemedStyles";

const RowChallenge = (props) => {
  const { time, nbKana } = props;

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flexDirection: "row",
        backgroundColor: theme.colors.backgroundOptions,
        width: "100%",
        height: 34,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: theme.borderRadius.base,
      },
      time: {
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: theme.fonts.outfitRegular,
      },
      nbKana: {
        fontSize: 16,
        color: theme.colors.hiscore,
        fontFamily: theme.fonts.outfitRegular,
      },
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.nbKana}>
        {nbKana} {nbKana > 1 ? "Katas" : "Kata"}
      </Text>
    </View>
  );
};

export default RowChallenge;
