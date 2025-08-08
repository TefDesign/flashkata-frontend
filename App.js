//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import DiscoverAppScreen from './screens/DiscoverAppScreen';

// Google Font
import { useFonts } from "expo-font";
import { Staatliches_400Regular } from "@expo-google-fonts/staatliches";
import { Outfit_300Light, Outfit_400Regular } from "@expo-google-fonts/outfit";
import * as SplashScreen from "expo-splash-screen";

//Redux
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import { useEffect } from "react";

//Redux-Persist
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({ users });
const persistConfig = { key: 'FlashKata', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();

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
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="DiscoverApp" component={DiscoverAppScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
