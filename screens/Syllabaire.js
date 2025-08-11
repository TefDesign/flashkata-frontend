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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import { API_URL } from "@env";

export default function Syllabaire({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state)

  console.log(user)


  /*
  const getProgress = () => {
    
    fetch(`${API_URL}/userProgress/signup`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, userName }));
          navigation.navigate("MainMenu");
        } else if (data.error) {
          alert(data.error);
        }
      });
  };


  */



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Pressable><Text>aa</Text></Pressable>
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
