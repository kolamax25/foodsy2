import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

/*import * as firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}*/




export default function App() {
  return <AppNavigator />;
}



const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: {screen : LoginScreen},
  HomeScreen: {screen : HomeScreen}
});
const AppNavigator = createAppContainer(AppSwitchNavigator);
