import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../styles/themeLight";

const Button = (props) => {
  const { title, icon: IconComponent, variant = "base" } = props;

  return (
    <TouchableOpacity style={styles[variant] || styles.base}>
      <View style={styles.btnContent}>
        {IconComponent && (
          <IconComponent width={36} height={36} style={styles.icon} />
        )}
        <Text style={variant !== "base" ? styles.textInverse : styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.base,
    width: "100%",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    height: 56,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
  textInverse: {
    color: theme.colors.primary,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },
  outline: {
    backgroundColor: "#ffffff",
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.base,
    width: "100%",
    height: 56,
    borderWidth: 2,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default Button;
