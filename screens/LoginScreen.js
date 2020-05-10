import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Icon, Input } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  const [errors, setErrors] = useState([]);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (!isEmailDisabled) emailInputRef.current?.focus();
  }, [isEmailDisabled]);

  useEffect(() => {
    if (!isPasswordDisabled) passwordInputRef.current?.focus();
  }, [isPasswordDisabled]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={() => {
          const errors = [];
          if (!isEmailEmpty) errors.push("Email must not be empty.");
          if (!isPasswordEmpty) errors.push("Password must not be empty.");
          if (errors.length === 0) {
            setErrors([
              <>
                <Text>Account not found in our system.</Text>
                <View style={{ flex: -1, flexDirection: "row" }}>
                  <Text>Don't have an account? </Text>
                  <Text style={{ textDecorationLine: "underline" }}>
                    Click{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                    onLongPress={() => {
                      // DEBUGGING PURPOSES, DELETE IN PRODUCTION
                      navigation.navigate("TodoList");
                    }}
                  >
                    <Text>here</Text>
                  </TouchableOpacity>
                  <Text> to create one.</Text>
                </View>
              </>,
            ]);
          } else {
            setErrors(
              errors.map((error, i) => (
                <Textsceren
                  style={{ color: "red", marginTop: 10 }}
                  key={i.toString()}
                >
                  {error}
                </Textsceren>
              ))
            );
          }
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>
      <Input
        label="Email"
        disabled={isEmailDisabled}
        ref={emailInputRef}
        onChangeText={(email) => {
          setIsEmailEmpty(email.length > 0);
        }}
        leftIcon={
          <Icon
            name="email"
            type="material-community"
            onPress={() => {
              setIsEmailDisabled(false);
            }}
          />
        }
        onBlur={() => setIsEmailDisabled(true)}
      />
      <Input
        label="Password"
        disabled={isPasswordDisabled}
        ref={passwordInputRef}
        onChangeText={(password) => {
          setIsPasswordEmpty(password.length > 0);
        }}
        leftIcon={
          <Icon
            name="lock"
            type="material-community"
            onPress={() => {
              setIsPasswordDisabled(false);
            }}
          />
        }
        onBlur={() => setIsPasswordDisabled(true)}
      />
      <Button
        title="Login"
        onPress={() => alert("This login button may or may not be working.")}
      />
      {errors}
    </View>
  );
}
