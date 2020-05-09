import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../screens/TodoListScreen";
import TodoListItemDetailsScreen from "../screens/TodoListItemDetailsScreen";
import TodoListItemDeleteScreen from "../screens/TodoListItemDeleteScreen";
import AdScreen from "../screens/AdScreen";

const Stack = createStackNavigator();

function AdWrapper() {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoList" component={TodoListStackNavigator} />
      <Stack.Screen name="Ad" component={AdScreen} />
    </Stack.Navigator>
  );
}

function TodoListStackNavigator() {
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
      <Stack.Screen name="Ad" component={AdScreen} />
    </Stack.Navigator>
  );
}

export default AdWrapper;
