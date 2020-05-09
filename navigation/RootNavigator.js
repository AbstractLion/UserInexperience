import React, { useEffect, useRef, useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import TodoListStackNavigator from "./TodoListStackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import AdScreen from "../screens/AdScreen";
import { Text } from "react-native";
import RegisterScreen from "../screens/RegisterScreen";

const AdStack = createStackNavigator();

function StopwatchHeader() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1); // <-- Change this line!
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
      {Math.floor(time / 60)
        .toString()
        .padStart(1, "0")}
      :{(time % 60).toString().padStart(2, "0")}
    </Text>
  );
}

function AdWrapper() {
  const stopwatch = useRef(<StopwatchHeader />);

  return (
    <AdStack.Navigator
      mode="modal"
      screenOptions={{
        headerTitle: () => {
          return stopwatch.current;
        },
      }}
    >
      <AdStack.Screen name="Root" component={RootNavigator} />
      <AdStack.Screen name="Ad" component={AdScreen} />
    </AdStack.Navigator>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
      <Stack.Screen name={"TodoList"} component={TodoListStackNavigator} />
    </Stack.Navigator>
  );
}

export default AdWrapper;
