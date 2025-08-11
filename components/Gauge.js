import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../styles/themeLight";

const Gauge = ({ progress = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]}>
        <Text style={styles.text}>{progress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - theme.spacing.large * 2,
    backgroundColor: theme.colors.background,
    height: 20,
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: theme.colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.background,
    fontFamily: theme.fonts.outfitRegular,
  },
});

export default Gauge;
