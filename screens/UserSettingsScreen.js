import {
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import LogoIcon from "../assets/icons/logo.svg";
import HeaderSecondary from "../components/HeaderSecondary";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../components/Avatar";
import Settings from "../components/Settings";
import Input from "../components/Input";
import Button from "../components/Button";
import useThemedStyles from "../hooks/useThemedStyles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const UserSettingsScreen = () => {

  const user = useSelector((state) => state.users);

  const [showModificationPassword, setShowModificationPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleModifyPassword = () => {

    if (!newPassword || !confirmNewPassword) {
      alert("Champ vide.")
      return
    }

    if (newPassword !== confirmNewPassword) {
      alert("Les mots de passe ne sont pas identiques.")
      return
    }

    fetch(`${API_URL}/users/modify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        id: user.id,
        token: user.token,
        password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          alert("Mot de passe modifié");
          setNewPassword("");
          setConfirmNewPassword("");
          setShowModificationPassword(false);
        }
      });
  };

  const [theme, styles] = useThemedStyles((theme) =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
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
        text: {
          fontFamily: theme.fonts.staatliches,
          fontSize: theme.fontSize.menu,
        }
      })
    );

  return (
      <SafeAreaView style={styles.container}>
        <HeaderSecondary isAvatar={false} />
        <LogoIcon
          width={256}
          height={136}
          style={{ color: theme.colors.text }}
        />
        <Avatar />
        <Text style={styles.text}>{user.username}</Text>
        <Settings />

        {!showModificationPassword && (
          <Button
            variant = "outline"
            style={styles.button}
            title="Changer de mot de passe"
            onPress={() => setShowModificationPassword(!showModificationPassword)}
          />
        )}

        {showModificationPassword && (
          <View>
            <Input
              placeholder="Nouveau mot de passe"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(value) => setNewPassword(value)}
              value={newPassword}
            />
            <Input
              placeholder="Confirmer mot de passe"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(value) => setConfirmNewPassword(value)}
              value={confirmNewPassword}
            />
          </View>
        )}

        <Button
          style={styles.button}
          title="Valider"
          onPress={() => handleModifyPassword()}
        />
      </SafeAreaView>
  );
};

export default UserSettingsScreen;