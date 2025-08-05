import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Google Font
import { useFonts } from "expo-font";
import { Staatliches_400Regular } from "@expo-google-fonts/staatliches";
import { Outfit_300Light, Outfit_400Regular } from "@expo-google-fonts/outfit";
import * as SplashScreen from "expo-splash-screen";

//Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import { useEffect } from "react";

const store = configureStore({
  reducer: { users },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Staatliches_400Regular,
    Outfit_300Light,
    Outfit_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && error) {
    return <Text>Chargement en cours...</Text>;
  }

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
    gap: 16,
  },
});
