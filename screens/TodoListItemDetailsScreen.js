import React from "react";
import { View, Text } from "react-native";

export default function TodoListDetailsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Your Todo Info:</Text>
      <Text style={{ margin: 10 }}>{JSON.stringify(route.params)}</Text>
      <Text style={{ textAlign: "center", margin: 10 }}>
        (The checkbox would normally go here, but we figured people could just
        delete a todo when they've finished it.)
      </Text>
    </View>
  );
}
