import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import HeaderSecondary from "../components/HeaderSecondary";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../components/Avatar";
import Settings from "../components/Settings";
import Button from "../components/Button";

const UserSettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary isAvatar={false} />
      <View style={styles.logo}>
        <LogoIcon width={256} height={136} />
      </View>
      <Avatar />
      <Settings />
      <Button
        style={styles.button}
        title="Changer de mot de passe"
      />
      <Button
        style={styles.button}
        title="Valider"
      />
    </SafeAreaView>
  );
};

export default UserSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  logo: {
    marginBottom: 78,
  },
  setting: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  button: {
    width: "85%",
  },
 });