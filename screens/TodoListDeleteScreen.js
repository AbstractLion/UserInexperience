import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Overlay, Button, Icon, Input } from "react-native-elements";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import TodoItemsContext from "../contexts/TodoItemsContext";
import UserContext from "../contexts/UserContext";
import useDidUpdate from "../hooks/useDidUpdate";

export default function TodoListDetailsScreen({ navigation, route }) {
  const [todoId, setTodoId] = useState("Enter the todo id here");
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [
    isDeletionPayOverlayVisible,
    setDeletionPayOverlayVisibility,
  ] = useState(false);
  const [isYesNoOverlayVisible, setYesNoOverlayVisibility] = useState(false);
  const [yesNoResult, setYesNoResult] = useState({});
  const { todos, setTodos } = useContext(TodoItemsContext);
  const { dropdownAlertRef } = useContext(DropdownAlertContext);
  const { user, setUser } = useContext(UserContext);

  useDidUpdate(() => {
    setYesNoOverlayVisibility(true);
  }, [yesNoResult]);

  async function deleteTodo() {
    if (user.remainingDeletions === 0) {
      setDeletionPayOverlayVisibility(true);
      return;
    }

    const response = await fetch("https://yesno.wtf/api");
    const result = await response.json();
    console.log(result);
    setYesNoResult(result);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
              <TouchableOpacity
                onPress={async () => {
                  await deleteTodo();
                  setOverlayVisibility(false);
                }}
              >
                <Text>yes</Text>
              </TouchableOpacity>
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
      <Overlay
        isVisible={isYesNoOverlayVisible}
        onBackdropPress={() => setYesNoOverlayVisibility(false)}
        children={
          <View style={{ flex: -1, alignItems: "center" }}>
            <Text>
              {yesNoResult.answer === "yes"
                ? "The YesNo API gave us a green light with deleting the todo."
                : "Sorry, the YesNo API told us that you can't delete the todo. Maybe try again?"}
            </Text>
            <Image
              source={{
                uri: yesNoResult.image,
              }}
              style={{ width: 300, height: 300, margin: 20 }}
            />
            <Button
              title={yesNoResult.answer === "yes" ? "Delete it" : "Bummer"}
              onPress={() => {
                if (yesNoResult.answer === "yes") {
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
                setYesNoOverlayVisibility(false);
              }}
            />
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
            color="white"
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
        <Text style={{ marginVertical: 10 }}>You have </Text>
        <TouchableOpacity
          onPress={() => {
            if (user.remainingDeletions === 0) {
              setUser({ ...user, remainingDeletions: 1 });
            }
          }}
        >
          <Text>{user.remainingDeletions}</Text>
        </TouchableOpacity>
        <Text> deletion(s) left.</Text>
      </View>
      <View style={{ flex: -1, flexDirection: "row" }}>
        <Text>You can buy more deletions by pressing </Text>
        <TouchableOpacity onPress={() => setDeletionPayOverlayVisibility(true)}>
          <Text>here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
