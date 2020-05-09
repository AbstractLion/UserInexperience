import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

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
      <Button
        onPress={
          !buttonPressed
            ? () => {
                alert(
                  `Your email is: ${username}. Please press this button again to sign in.`
                );
                setButtonPress(true);
              }
            : () => {
              navigation.push("TodoListStackNavigator");
            }
        }
        title={"Sign In"}
      />
    </View>
  );
}
