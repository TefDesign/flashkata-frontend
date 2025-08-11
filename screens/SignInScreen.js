import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import GoogleIcon from "../assets/icons/google.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";
import { API_URL } from "@env";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    console.log('signin')
    fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data : ', data)
        if (data.result) {
          dispatch(login({ token: data.token, username: data.userName, id: data.id }));
          navigation.navigate("MainMenu");
        } else if (data.error) {
          alert(data.error);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logo}>
        <LogoIcon width={280} height={280} />
      </View>
      <Text style={styles.title}>Se connecter</Text>
      <Button
        icon={GoogleIcon}
        title="Google"
        variant="outline"
        style={styles.button}
      />
      <View style={styles.barre} />
      <Text style={styles.title}>ou directement</Text>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Input
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Button
        style={styles.button}
        title="Se connecter"
        onPress={() => handleSignin()}
      />
      <TouchableOpacity>
        <Text style={styles.resetPassword}>Mot de passe oublié</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.title,
    margin: theme.spacing.medium,
  },
  button: {
    margin: theme.spacing.small,
    width: "85%",
  },
  barre: {
    width: "60%",
    backgroundColor: theme.colors.error,
    height: 4,
    marginTop: theme.spacing.medium,
  },
  resetPassword: {
    fontFamily: theme.fonts.outfitRegular,
    fontSize: theme.fontSize.text,
    color: theme.colors.error,
    marginTop: theme.spacing.medium,
  },
});
