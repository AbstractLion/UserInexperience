import React, { useContext, useState } from "react";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import { ListItem, Icon, Overlay, Button } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import TodoItemsContext from "../contexts/TodoItems";
import { useNavigation } from "@react-navigation/core";

const actions = [
  {
    text: "Create Todo",
    icon: <Icon name="trash" type="entypo" color={"white"} />,
    name: "create_todo",
    color: "red",
    position: 1,
  },
];

export default function TodoListScreen() {
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const { todos } = useContext(TodoItemsContext);
  const navigation = useNavigation();

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
              You can only have a maximum of 3 todos. Upgrade to premium to
              bypass this limit!
            </Text>
            <Button title="Buy premium for only $10/month" />
            <View style={{ flex: -1, flexDirection: "row" }}>
              <Text>Or </Text>
              <Text
                style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              >
                press
              </Text>
              <TouchableHighlight
                onPress={() => {
                  console.log("hi");
                }}
              >
                <Text> here </Text>
              </TouchableHighlight>
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
