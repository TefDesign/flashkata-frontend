import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SettingIcon from "../assets/icons/setting.svg";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";

const Settings = () => {
  const navigation = useNavigation();

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
      setting: {
        position: "absolute",
        bottom: 30,
        right: 30,
      },
    })
  );

  return (
    <TouchableOpacity
      style={styles.setting}
      onPress={() => navigation.navigate("Settings")}
    >
      <SettingIcon
        width={30}
        height={30}
        style={{ color: theme.colors.text }}
      />
    </TouchableOpacity>
  );
};

export default Settings;
