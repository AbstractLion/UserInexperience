import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function GeoProAd() {
  const [countries, setCountries] = useState({});
  useEffect(() => {
    fetch("https://restcountries-v1.p.rapidapi.com/all", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "fd80f3f092msh8b3fd384bbfef5bp1bdad0jsnd84898968437",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let obj = {};
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          obj[item.name] = {
            name: item.name,
            capital: item.capital,
            region: item.region,
            population: item.population,
          };
        }
        setCountries(obj);
      });
  }, []);
  return (
    <View>
      <Text>
        Failing Geography? No problem! Our phone app will let you cheat on your
        geography tests at ease. Test a demo below!
      </Text>
      <Text>
        {countries ? countries["Canada"].capital : null}
      </Text>
    </View>
  );
}
