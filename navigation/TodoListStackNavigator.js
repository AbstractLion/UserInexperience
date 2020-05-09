import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../screens/TodoListScreen";
import TodoListItemDetailsScreen from "../screens/TodoListItemDetailsScreen";

const Stack = createStackNavigator();

export default function TodoListStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={"TodoList"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"TodoList"} component={TodoListScreen} />
      <Stack.Screen
        name={"TodoListDetails"}
        component={TodoListItemDetailsScreen}
      />
    </Stack.Navigator>
  );
}
