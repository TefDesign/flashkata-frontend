import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";

import LogoIcon from "../assets/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../components/Settings";
import HeaderSecondary from "../components/HeaderSecondary";
import Separator from "../components/Separator";
import SliderRange from "../components/SliderRange";
import SwitchOption from "../components/SwitchOption";
import { useState } from "react";
import useThemedStyles from "../hooks/useThemedStyles";

const ChallengeScreen = ({ navigation }) => {
  const [activeLimit, setActiveLimit] = useState(false);
  const [timeoutMinutes, setTimeoutMinutes] = useState(1);

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        paddingHorizontal: theme.spacing.large,
      },
      logo: {
        marginBottom: 40,
      },
      title: {
        fontFamily: theme.fonts.staatliches,
        fontSize: theme.fontSize.menu,
        margin: theme.spacing.medium,
        marginBottom: theme.spacing.large,
        color: theme.colors.text,
      },
      subMenu: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.subMenu,
        margin: theme.spacing.small,
        color: theme.colors.text,
        marginBottom: 5,
        textAlign: "center",
      },
      text: {
        fontFamily: theme.fonts.outfitRegular,
        fontSize: theme.fontSize.text,
        color: theme.colors.text,
      },
      sliderContainer: {
        alignItems: "center",
        gap: theme.spacing.large,
        marginBottom: theme.spacing.large,
      },
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary />
      <View style={styles.logo}>
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
      </View>
      <Text style={styles.title}>Challenge</Text>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Hiragana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Katakana</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <Text style={styles.subMenu}>Tout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Score")}>
        <Text style={styles.subMenu}>Score</Text>
      </TouchableOpacity>
      <Separator />
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Activer le chrono</Text>
        <SwitchOption value={activeLimit} onChange={setActiveLimit} />
        {activeLimit &&
          <SliderRange 
            mode="time" 
            value={timeoutMinutes} 
            onChange={setTimeoutMinutes} 
            />}
      </View>
      <Button
          title="Lancer le challenge"
          onPress={() =>
            navigation.navigate("Quizz", {
              timeoutMinutes,            // valeur du slider
              limitEnabled: activeLimit, // ON/OFF chrono
            })
          }
        />
      <Settings />
    </SafeAreaView>
  );
};

export default ChallengeScreen;
