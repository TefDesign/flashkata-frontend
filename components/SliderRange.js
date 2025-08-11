import { Slider } from "@react-native-assets/slider";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import theme from "../styles/themeLight";

const SliderRange = () => {
  const [sliderValue, setSliderValue] = useState(1);

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          left: ((sliderValue - 1) / 9) * 300 - 22,
          top: -16,
          fontSize: theme.fontSize.small,
          fontWeight: "bold",
          color: theme.colors.text,
          textAlign: "center",
        }}
      >
        {sliderValue} {sliderValue === 1 ? "card" : "cards"}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
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
