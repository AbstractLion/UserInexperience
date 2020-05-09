import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import * as EmailValidator from "email-validator";

export default function LoginScreen() {
  const fieldText = "Enter your username + password";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(
    "Please Enter And Confirm Your Email And Password"
  );
  const [confirmPass, setConfirmPass] = useState(
    "Please Enter And Confirm Your Email And Password"
  );
  const { dropdownAlertRef } = useContext(DropdownAlertContext);
  const [buttonPressed, setButtonPress] = useState(false);
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
    <View>
      <Button
        onPress={
          (
            EmailValidator.validate(username) &&
            password.length === 8 &&
            password.includes(username[4]) &&
            password.includes(username[6]) &&
            password.includes(username[8]) &&
            username.length >= 12
          )
            ? !buttonPressed
              ? () => {
                  alert(
                    `Your email is: ${username}. There is no account associated with this email. Please press this button again to create a new account.`
                  );
                  setButtonPress(true);
                }
              : () => {
                  navigation.push("TodoListStackNavigator");
                }
            : () => {
                alert("Invalid Email or Password!");
              }
        }
        title={"Sign In"}
      />
      <Input
        value={password}
        secureTextEntry
        onChangeText={(string) => setPassword(string)}
      />
      <Input
        value={username}
        placeholder={"Your email"}
        secureTextEntry
        onChangeText={(string) => setUsername(string)}
      />
      <Text>
        {`
          Password must be exactly 8 characters \n
          Must contain 4th 6th and 8th character of email \n
          Must have exactly 1 capital letter, 1 number, and 5th character must be an underscore \n
          Email must be at least 12 characters \n
          Must be all lowercase \n
        `}
      </Text>
      <Input
        value={confirmPass}
        onChangeText={(string) => setConfirmPass(string)}
      />
    </View>
  );
}
