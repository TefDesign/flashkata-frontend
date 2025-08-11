import { View, Text, StyleSheet } from "react-native";
import { Slider } from "@react-native-assets/slider";
import { useState } from "react";
import theme from "../styles/themeLight";

const SliderRange = (props) => {
  const { mode = "cards" } = props;

  const [sliderValue, setSliderValue] = useState(mode === "cards" ? 5 : 1);

  const getMode = () => {
    if (mode === "time") {
      return {
        display: `${sliderValue} min`,
        min: 1,
        max: 10,
      };
    } else if (mode === "cards") {
      return {
        display: `${sliderValue} cartes`,
        min: 5,
        max: 15,
      };
    }
  };

  const { display, min, max } = getMode();
  const styleLeft = ((sliderValue - min) / (max - min)) * 300 - 25;

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          left: styleLeft,
          top: -16,
          fontSize: theme.fontSize.small,
          fontWeight: "bold",
          color: theme.colors.text,
          textAlign: "center",
        }}
      >
        {display}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        onValueChange={(value) => setSliderValue(value)}
        step={1}
        value={sliderValue}
        minimumTrackTintColor={theme.colors.success}
        maximumTrackTintColor={theme.colors.border}
        thumbTintColor={theme.colors.text}
        trackHeight={10}
        thumbSize={26}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: 300,
    height: 40,
  },
});

export default SliderRange;
