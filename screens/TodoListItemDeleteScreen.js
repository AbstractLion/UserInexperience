import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";

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
      <Button
        title="Delete the ToDo now!"
        onPress={() => {}}
        icon={
          <Icon
            name="trash"
            type="entypo"
            onPress={() => {
              console.log("deleting todo");
            }}
          />
        }
      />
    </View>
  );
}
