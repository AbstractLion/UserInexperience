import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../screens/TodoListScreen";
import TodoListItemDetailsScreen from "../screens/TodoListItemDetailsScreen";
import TodoListItemDeleteScreen from "../screens/TodoListItemDeleteScreen";

const Stack = createStackNavigator();

export default function TodoListStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={"TodoList"}>
      <Stack.Screen name={"TodoList"} component={TodoListScreen} />
      <Stack.Screen
        name={"TodoListItemDetails"}
        component={TodoListItemDetailsScreen}
      />
      <Stack.Screen
        name="TodoListItemDelete"
        component={TodoListItemDeleteScreen}
      />
    </Stack.Navigator>
  );
}
