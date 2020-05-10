import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "../screens/TodoListScreen";
import TodoListItemDetailsScreen from "../screens/TodoListItemDetailsScreen";
import TodoListDeleteScreen from "../screens/TodoListDeleteScreen";
import AdScreen from "../screens/AdScreen";
import CongratulationsScreen from "../screens/CongratulationsScreen";
import TodoListCreateScreen from "../screens/TodoListCreateScreen";

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
    <Stack.Navigator
      initialRouteName={"TodoList"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"TodoList"} component={TodoListScreen} />
      <Stack.Screen
        name={"TodoListItemDetails"}
        component={TodoListItemDetailsScreen}
      />
      <Stack.Screen name="TodoListDelete" component={TodoListDeleteScreen} />
      <Stack.Screen name="TodoListCreate" component={TodoListCreateScreen} />
    </Stack.Navigator>
  );
}

export default AdWrapper;
