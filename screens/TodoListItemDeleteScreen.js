import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Overlay, Button, Icon, Input } from "react-native-elements";
import DropdownAlertContext from "../contexts/DropdownAlert";
import TodoItemsContext from "../contexts/TodoItems";

export default function TodoListDetailsScreen({ navigation, route }) {
  const [todoId, setTodoId] = useState("Enter the todo id here");
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const { todos, setTodos } = useContext(TodoItemsContext);
  const { dropdownAlertRef } = useContext(DropdownAlertContext);

  function deleteTodo() {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  return (
    <View>
      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => setOverlayVisibility(false)}
        children={
          <View>
            <View style={{ flex: -1, flexDirection: "row" }}>
              <Text>Are you sure? Answer </Text>
              <TouchableHighlight
                onPress={() => {
                  deleteTodo();
                  setOverlayVisibility(false);
                  dropdownAlertRef.current.alertWithType(
                    "error",
                    "You just eliminated an innocent todo.",
                    "I hope you feel terrible about destroying a poor, innocent todo that did not deserve death.\n" +
                      `"Todo #${todoId}", you shall always be remembered.`
                  );
                }}
              >
                <Text>yes</Text>
              </TouchableHighlight>
              <Text> if you wish to delete this todo.</Text>
            </View>
            <View
              style={{
                flex: -1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                style={styles.button}
                title="I'm not sure."
                onPress={() => setOverlayVisibility(false)}
              />
              <Button
                title="No."
                style={styles.button}
                onPress={() => setOverlayVisibility(false)}
              />
              <Button
                title="Nevermind"
                style={styles.button}
                onPress={() => setOverlayVisibility(false)}
              />
            </View>
          </View>
        }
      />
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
        onPress={() => {
          dropdownAlertRef.current.alertWithType(
            "success",
            "Success, nothing happened.",
            "Nothing successfully happened."
          );
        }}
        icon={
          <Icon
            name="trash"
            type="entypo"
            onPress={() => {
              setOverlayVisibility(true);
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
