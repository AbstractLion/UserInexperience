import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
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
  const [buttonPressed, setButtonPress] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <Button
        onPress={
          EmailValidator.validate(username)
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
                alert("Invalid Email!");
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
      <Input
        value={confirmPass}
        onChangeText={(string) => setConfirmPass(string)}
      />
    </View>
  );
}
