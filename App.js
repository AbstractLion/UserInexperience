import React, {useState} from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import TodoItemsContext from "./contexts/TodoItems";
import TodoListStackNavigator from "./navigation/TodoListStackNavigator";
import {createStackNavigator} from "@react-navigation/stack";
import cuid from "cuid";
import IntroScreen from "./screens/IntroScreen";

const Stack = createStackNavigator();

export default function App() {
  const [welcomeScreenDone, setWelcomeScreenDone] = useState(false);
  const [todos, setTodos] = useState([
    {
      name: "Example To-do",
      id: cuid(),
    },
    {
      name: "Delete me!",
      id: cuid(),
    },
    {
      name: "This is what a todo looks like.",
      id: cuid(),
    },
  ]);

  return (
    <NavigationContainer>
      {
        welcomeScreenDone ? (
          <>
            <StatusBar barStyle={"dark"}/>
            <TodoItemsContext.Provider value={{todos, setTodos}}>
              <Stack.Navigator initialRouteName={"TodoListStackNavigator"}>
                <Stack.Screen
                  name={"TodoListStackNavigator"}
                  component={TodoListStackNavigator}
                />
              </Stack.Navigator>
            </TodoItemsContext.Provider>
          </>
        ) : <IntroScreen onDone={() => setWelcomeScreenDone(true)}/>
      }
    </NavigationContainer>
  );
}
