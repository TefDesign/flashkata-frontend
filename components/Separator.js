import { StyleSheet, Text, View } from "react-native";
import theme from "../styles/themeLight";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 4,
    width: "60%",
    marginBlock: theme.spacing.medium,
  },
});
