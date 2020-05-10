import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import UserContext from "../contexts/UserContext";

export default function TodoListCreateScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [
    isForgotPasswordOverlayVisible,
    setForgotPasswordOverlayVisibility,
  ] = useState(false);
  const { user } = useContext(UserContext);

  function nextChar(c) {
    if (c === "z") return "a";
    if (c === "Z") return "A";
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  function rot13(string) {
    const arr = string.split("");
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].toLowerCase() !== arr[i].toUpperCase()) {
        for (let j = 0; j < 13; ++j) arr[i] = nextChar(arr[i]);
      }
    }
    return arr.join("");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Overlay
        isVisible={isForgotPasswordOverlayVisible}
        onBackdropPress={() => setForgotPasswordOverlayVisibility(false)}
        children={
          <View style={{ flex: -1 }}>
            <Text>Your password is:</Text>
            <Text>{rot13(user.password)}</Text>
            <Text>(Securely encrypted with ROT13, of course)</Text>
          </View>
        }
      />
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Create Todo
      </Text>
      <Input
        label="Name of Todo"
        placeholder="Name of Todo goes here"
        placeholderTextColor="black"
        value={name}
        onChangeText={(string) => setPassword(string)}
      />
      <Input
        label="Confirm Password"
        value={password}
        secureTextEntry
        onChangeText={(string) => setName(string)}
      />
      <TouchableOpacity
        onPress={() => setForgotPasswordOverlayVisibility(true)}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      {errors.map((error, i) => (
        <Text style={{ color: "red" }} key={i.toString()}>
          {error}
        </Text>
      ))}
      <Button
        title="Make Changes"
        onPress={() => {
          const errors = [];
          if (name.length === 0) {
            errors.push("Name cannot be empty.");
          }
          if (password !== user.password) {
            errors.push("Incorrect password.");
          }

          if (errors.length === 0) {
            navigation.navigate("Congratulations");
          } else {
            setErrors(errors);
          }
        }}
      />
    </View>
  );
}
