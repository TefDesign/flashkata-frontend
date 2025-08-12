import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import GoogleIcon from "../assets/icons/google.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import { API_URL } from "@env";

export default function Syllabaire({ navigation, route }) {

  const { type } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users)

  const [progress, setProgress] = useState([])


  console.log(type)

  const getProgress = async () => {
    try {
      console.log("debut", API_URL)
      const resp = await fetch(`${API_URL}/progress/userProgress/${user.token}/${user.id}/${type}`)

      const data = await resp.json()
      console.log('resp : ', data)

      setProgress(data.data)
    } catch (error) {
      console.log('Erreur fetch:', error)
    }
  };

  useEffect(() => {
    getProgress()
  }, [type]) // Se déclenche quand 'type' change

  const list = progress?.map((val, index) =>
    <Pressable key={index}><Text>{val.katakanaId?.name || val.hiraganaId?.name}</Text></Pressable>
  ) || []

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        {list}
      </View>

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
  }
});
