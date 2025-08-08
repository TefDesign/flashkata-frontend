import { Dimensions, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import KataWrite from "../components/KataWrite";
import { useSharedValue } from "react-native-reanimated";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({ token: data.token, username: data.userName, id: data.id })
          );
          navigation.navigate("MainMenu");
        } else if (data.message) {
          alert(data.message);
        }
      });
  };

  return (
    <GestureHandlerRootView style={styles.containerGestureRoot}>
      {cards.map((card, index) => (
        <Card
          key={index}
          kata={<KataWrite {...card} />}
          isFlipped={isFlippedArray.current[index]}
        />
      ))}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  containerGestureRoot: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
