import { StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";

const RowChallenge = (props) => {
  const { time, nbKana } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time} min</Text>
      <Text style={styles.nbKana}>
        {nbKana} {nbKana > 1 ? "Katas" : "Kata"}
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
  nbKana: {
    fontSize: 16,
    color: theme.colors.success,
    fontFamily: theme.fonts.outfitRegular,
  },
});
