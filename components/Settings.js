import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SettingIcon from "../assets/icons/setting.svg";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.setting}
      onPress={() => navigation.navigate("Settings")}
    >
      <SettingIcon width={30} height={30} />
    </TouchableOpacity>
  );
};

export default Settings;

const styles = StyleSheet.create({
  setting: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
