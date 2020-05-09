import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";

export default function TodoListDetailsScreen({ navigation, route }) {
  const [todoId, setTodoId] = useState("Enter the todo id here");

  return (
    <View>
      <Text>Enter the id of the Todo you wish to delete:</Text>
      <Input
        inputStyle={{
          color: "gray",
        }}
        value={todoId}
        onChangeText={(text) => setTodoId(text)}
      />
    </View>
  );
}
