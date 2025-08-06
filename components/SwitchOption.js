import { StyleSheet } from "react-native";
import { useState } from "react";
import SwitchToggle from "react-native-switch-toggle";
import theme from "../styles/themeLight";

const SwitchOption = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <SwitchToggle
      switchOn={isEnabled}
      onPress={() => setIsEnabled(!isEnabled)}
      containerStyle={styles.container}
      backgroundColorOn={"rgba(38,50,56,.7)"}
      backgroundColorOff={"rgba(38,50,56,.28)"}
      circleStyle={styles.circle}
      circleColorOff={theme.colors.dark}
      circleColorOn={theme.colors.dark}
    />
  );
};

export default SwitchOption;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: 60,
    height: 25,
    borderRadius: 25,
    padding: 0,
    margin: 0,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    left: -3,
  },
});
