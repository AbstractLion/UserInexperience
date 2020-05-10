import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

export default function NumberFactAd() {
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    fetch(
      "https://numbersapi.p.rapidapi.com/random/trivia?max=20&fragment=true&min=10&json=true",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "numbersapi.p.rapidapi.com",
          "x-rapidapi-key":
            "fd80f3f092msh8b3fd384bbfef5bp1bdad0jsnd84898968437",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
  return (
    <View style={{ margin: 40 }}>
      <Text style={{ fontWeight: "bold", fontSize: 35, marginBottom: 10 }}>
        Did you know?
      </Text>
      {countries ? (
        <Text style={{ fontSize: 20 }}>
          {countries.number} is {countries.text}
        </Text>
      ) : null}
      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 30}}>Come sign up for our free* course!</Text>
        <Text style={{marginTop: 20}}>
          *Free only for the last person to sign up. Conditions apply.
        </Text>
      </View>
    </View>
  );
}
