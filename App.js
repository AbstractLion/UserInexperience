import React, { useContext, useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TodoItemsContext from "./contexts/TodoItemsContext";
import TodoListStackNavigator from "./navigation/TodoListStackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import cuid from "cuid";
import IntroScreen from "./screens/IntroScreen";
import DropdownAlertContext from "./contexts/DropdownAlertContext";
import DropdownAlert from "react-native-dropdownalert";
import UserContext from "./contexts/UserContext";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  const [welcomeScreenDone, setWelcomeScreenDone] = useState(false);
  const [user, setUser] = useState({
    remainingDeletions: 1,
  });
  const [todos, setTodos] = useState([
    {
      name: "Example To-do",
      id: cuid().slice(-6),
    },
    {
      name: "Delete me!",
      id: cuid().slice(-6),
    },
    {
      name: "This is what a todo looks like.",
      id: cuid().slice(-6),
    },
  ]);
  const dropdownAlertRef = useRef();

  return (
    <NavigationContainer>
      {welcomeScreenDone ? (
        <>
          <StatusBar barStyle={"dark"} />
          <DropdownAlertContext.Provider value={{ dropdownAlertRef }}>
            <TodoItemsContext.Provider value={{ todos, setTodos }}>
              <UserContext.Provider value={{ user, setUser }}>
                <Stack.Navigator initialRouteName={"LoginScreen"}>
                  <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
                  <Stack.Screen
                    name={"TodoListStackNavigator"}
                    component={TodoListStackNavigator}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </UserContext.Provider>
            </TodoItemsContext.Provider>
            <DropdownAlert ref={dropdownAlertRef} />
          </DropdownAlertContext.Provider>
        </>
      ) : (
        <IntroScreen onDone={() => setWelcomeScreenDone(true)} />
      )}
    </NavigationContainer>
  );
}
