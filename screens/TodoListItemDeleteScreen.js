import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Overlay, Button, Icon, Input } from "react-native-elements";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import TodoItemsContext from "../contexts/TodoItemsContext";
import UserContext from "../contexts/UserContext";
import RNPickerSelect from "react-native-picker-select";

export default function TodoListDetailsScreen({ navigation, route }) {
  const [todoId, setTodoId] = useState("Enter the todo id here");
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [
    isDeletionPayOverlayVisible,
    setDeletionPayOverlayVisibility,
  ] = useState(false);
  const { todos, setTodos } = useContext(TodoItemsContext);
  const { dropdownAlertRef } = useContext(DropdownAlertContext);
  const { user, setUser } = useContext(UserContext);

  function deleteTodo() {
    console.log(user);
    if (user.remainingDeletions === 0) {
      setDeletionPayOverlayVisibility(true);
      return;
    }
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    setUser({ ...user, remainingDeletions: 0 });
    dropdownAlertRef.current.alertWithType(
      "error",
      "You just eliminated an innocent todo.",
      "I hope you feel terrible about destroying a poor, innocent todo that did not deserve death.\n" +
        `"Todo #${todoId}", you shall always be remembered.`
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Overlay
        isVisible={isDeletionPayOverlayVisible}
        onBackdropPress={() => setDeletionPayOverlayVisibility(false)}
        children={
          <View style={{ flex: -1 }}>
            <Text>
              Out of deletions? Not to worry! Unlike other apps, our app allows
              to you purchase as many deletions as you want!
            </Text>
            <Button
              title="Buy 10 deletions for the cheap, cheap, price of $25!"
              onPress={() => {
                alert("TODO: Implement Billing");
              }}
            />
          </View>
        }
      />
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
      <View
        style={{
          flex: -1,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text>You have </Text>
        <TouchableHighlight
          onPress={() => {
            if (user.remainingDeletions === 0) {
              setUser({ ...user, remainingDeletions: 1 });
            }
          }}
        >
          <Text>{user.remainingDeletions}</Text>
        </TouchableHighlight>
        <Text> deletions left.</Text>
      </View>
      <View style={{ flex: -1, flexDirection: "row" }}>
        <Text>You can buy more deletions by pressing </Text>
        <TouchableHighlight
          onPress={() => setDeletionPayOverlayVisibility(true)}
        >
          <Text>here.</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
