import React from "react";
import { View, Text } from "react-native";

export default function TodoListDetailsScreen({ navigation, route }) {
  return (
    <View>
      <Text>{JSON.stringify(route.params)}</Text>
    </View>
  );
}
