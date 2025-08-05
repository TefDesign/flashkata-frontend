import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../styles/themeLight";

const ButtonIcon = (props) => {
  const { icon: IconComponent } = props;

  return (
    <TouchableOpacity style={styles.base}>
      <View style={styles.btnContent}>
        <IconComponent width={40} height={40} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#ffffff",
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.base,
    width: 60,
    height: 60,
    borderWidth: 2,
  },

  icon: {
    marginRight: theme.spacing.small,
  },
  btnContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    left: 3,
  },
});

export default ButtonIcon;
