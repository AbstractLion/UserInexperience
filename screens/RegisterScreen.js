import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import * as EmailValidator from "email-validator";

export default function RegisterScreen() {
  const fieldText = "Enter your email + password";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Your Password");
  const [confirmPass, setConfirmPass] = useState("");

  const { dropdownAlertRef } = useContext(DropdownAlertContext);
  const [errors, setErrors] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setInterval(() => {
      dropdownAlertRef.current?.alertWithType(
        "error",
        "A known error has occurred.",
        "Please fix it."
      );
    }, 50 * 1000);

    setInterval(() => {
      navigation.navigate("Ad");
    }, 60 * 1000);
  }, []);
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
      {errors.map((error) => (
        <Text style={{ color: "red" }}>{error}</Text>
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
