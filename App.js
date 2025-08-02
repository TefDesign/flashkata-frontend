import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
const store = configureStore({
  reducer: { users },
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
