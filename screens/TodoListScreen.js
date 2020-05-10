import React, { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ListItem, Icon, Overlay, Button } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import TodoItemsContext from "../contexts/TodoItemsContext";
import { useNavigation } from "@react-navigation/core";
import { CheckBox } from "react-native-elements";

const actions = [
  {
    text: "Create Todo",
    icon: <Icon name="trash" type="entypo" color={"white"} />,
    name: "create_todo",
    color: "red",
    position: 1,
  },
];

export default function TodoListScreen({ navigation, route }) {
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const { todos } = useContext(TodoItemsContext);

  return (
    <View style={{ flex: 1 }}>
      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => setOverlayVisibility(false)}
        children={
          <View
            style={{ flex: -1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ padding: 10 }}>
              {todos.length === 3
                ? "You can only have a maximum of 3 todos. Upgrade to premium to " +
                  "bypass this limit!"
                : todos.length > 0
                ? "You need to delete all the example todos first " +
                  "before you can create your own! Upgrade to premium to bypass this restriction!"
                : "Are you sure? This change is not irreversable."}
            </Text>
            <Button
              title={
                todos.length !== 0
                  ? "Buy premium for only $10/month"
                  : "I don't care."
              }
              onPress={() => {
                if (todos.length !== 0) return;
                navigation.navigate("TodoListCreate");
              }}
            />
            <View style={{ flex: -1, flexDirection: "row" }}>
              <Text>Or </Text>
              <Text
                style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              >
                press
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TodoListDelete");
                }}
              >
                <Text> here </Text>
              </TouchableOpacity>
              <Text style={{ color: "red" }}>to delete a </Text>
              <Text>todo</Text>
            </View>
          </View>
        }
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.name}
              subtitle="Press on the todo for more information."
              leftElement={
                <Icon
                  name="chevron-left"
                  type="entypo"
                  onPress={() => {
                    navigation.navigate("TodoListItemDetails", item);
                  }}
                />
              }
            />
          );
        }}
      />
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          setOverlayVisibility(true);
        }}
      />
    </View>
  );
}
