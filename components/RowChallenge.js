import { StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";

const RowChallenge = (props) => {
  const { time, nbKata } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time} min</Text>
      <Text style={styles.nbKata}>
        {nbKata} {nbKata > 1 ? "Katas" : "Kata"}
      </Text>
    </View>
  );
};

export default RowChallenge;

const styles = StyleSheet.create({
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
  nbKata: {
    fontSize: 16,
    color: theme.colors.success,
    fontFamily: theme.fonts.outfitRegular,
  },
});
