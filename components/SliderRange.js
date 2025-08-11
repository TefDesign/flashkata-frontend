import { Slider } from "@react-native-assets/slider";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import theme from "../styles/themeLight";

const SliderRange = (props) => {
  const { mode } = props;

  const [sliderValue, setSliderValue] = useState(5);

  const getMode = () => {
    if (mode === "time") {
      return `${sliderValue} min`;
    } else if (mode === "cards") {
      return `${sliderValue} cartes`;
    }
    return `${sliderValue}`;
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          left: ((sliderValue - 5) / (15 - 5)) * 300 - 25,
          top: -16,
          fontSize: theme.fontSize.small,
          fontWeight: "bold",
          color: theme.colors.text,
          textAlign: "center",
        }}
      >
        {getMode()}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={15}
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
