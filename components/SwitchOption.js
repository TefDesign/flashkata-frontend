import { StyleSheet } from "react-native";
import { useState } from "react";
import SwitchToggle from "react-native-switch-toggle";

import useThemedStyles from "../hooks/useThemedStyles";

const SwitchOption = (props) => {
  const { value = false, onChange } = props;

  const handlePress = () => {
    if (onChange) onChange(!value);
  };

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
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
    })
  );

  return (
    <SwitchToggle
      switchOn={value}
      onPress={handlePress}
      containerStyle={styles.container}
      backgroundColorOn={theme.colors.switchBgOn}
      backgroundColorOff={theme.colors.switchBgOff}
      circleStyle={styles.circle}
      circleColorOff={theme.colors.switchCursor}
      circleColorOn={theme.colors.switchCursor}
    />
  );
};

export default SwitchOption;
