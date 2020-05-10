import React, { useEffect, useRef, useState, useContext } from "react";
import LoginScreen from "../screens/LoginScreen";
import TodoListStackNavigator from "./TodoListStackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import AdScreen from "../screens/AdScreen";
import { Text, TouchableOpacity, View } from "react-native";
import RegisterScreen from "../screens/RegisterScreen";
import DropdownAlertContext from "../contexts/DropdownAlertContext";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";
const AdStack = createStackNavigator();

const timeRef = React.createRef();

function StopwatchHeader() {
  const [time, setTime] = useState(timeRef.current);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        timeRef.current = prevTime + 1;
        return prevTime + 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Ad")}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {Math.floor(time / 60)
          .toString()
          .padStart(1, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </Text>
    </TouchableOpacity>
  );
}

function SkipAd() {
  const [time, setTime] = useState(5);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        return prevTime - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={{ marginLeft: 10 }}>
      {time > 0 ? (
        <Text style={{ fontWeight: "bold" }}>Skip ad in {time}</Text>
      ) : (
        <Icon
          name="cross"
          type="entypo"
          onPress={() => {
            navigation.navigate("Root");
          }}
        />
      )}
    </View>
  );
}

function AdWrapper() {
  const stopwatch = useRef(<StopwatchHeader />);

  const isSkip = Math.random() > 0.5;
  return (
    <AdStack.Navigator
      mode="modal"
      screenOptions={{
        headerTitle: () => {
          return stopwatch.current;
        },
        gestureEnabled: false,
      }}
    >
      <AdStack.Screen name="Root" component={RootNavigator} />
      <AdStack.Screen
        name="Ad"
        component={AdScreen}
        options={{
          headerLeft: () => {
            return <SkipAd skip={isSkip} />;
          },
        }}
      />
    </AdStack.Navigator>
  );
}

const Stack = createStackNavigator();

function RootNavigator({ navigation }) {
  const { dropdownAlertRef } = useContext(DropdownAlertContext);

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
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
      <Stack.Screen name={"TodoList"} component={TodoListStackNavigator} />
    </Stack.Navigator>
  );
}

export default AdWrapper;
