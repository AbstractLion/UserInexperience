import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import * as EmailValidator from "email-validator";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("Your Password");
  const [confirmPass, setConfirmPass] = useState("");

  const [errors, setErrors] = useState([]);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Register
      </Text>
      <Input
        label="Password"
        inputStyle={{ color: "lightgray" }}
        placeholder="Your Password"
        value={password}
        onChangeText={(string) => setPassword(string)}
      />
      <Input
        label="Email"
        value={email}
        placeholder={"Your Email"}
        secureTextEntry
        onChangeText={(string) => setEmail(string)}
      />
      <Input
        label="Confirm Password"
        value={confirmPass}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(string) => setConfirmPass(string)}
      />
      {errors.map((error, i) => (
        <Text style={{ color: "red" }} key={i.toString()}>
          {error}
        </Text>
      ))}
      <Button
        onPress={() => {
          const errors = [];
          if (!EmailValidator.validate(email)) {
            errors.push("Invalid email.");
          }

          if (password.length !== 8) {
            errors.push("Password length must be exactly 8 characters long.");
          }

          if (!(password.includes(email[3]) && password.includes(email[5]))) {
            errors.push(
              "Password must contain the 4th and 6th characters of your email."
            );
          }

          if (email.length < 12) {
            errors.push("Email must be at least 12 characters long.");
          }

          for (let i = 0; i < Math.min(email.length, password.length); ++i) {
            if (password[i] === email[i]) {
              errors.push(
                "Email and password must not share any characters in the same position."
              );
              break;
            }
          }

          if (errors.length === 0) {
            navigation.navigate("TodoList");
          } else {
            setErrors(errors);
          }
        }}
        title={"Register"}
      />
    </View>
  );
}
