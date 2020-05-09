import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

export default function GeoProAd() {
  const [countries, setCountries] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("Canada");
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
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          obj[item.name] = {
            name: item.name,
            capital: item.capital,
            region: item.region,
            population: item.population,
          };
          arr.push({value: item.name});
        }
        setCountryList(arr);
        setCountries(obj);
      });
  }, []);
  return (
    <View style={{margin:40}}>
      <Text>
        Failing Geography? No problem! Our phone app will let you cheat on your
        geography tests at ease. Test a demo below!
      </Text>
      <Dropdown label={"Countries"} data={countryList} onChangeText={(string) => setCurrentCountry(string)}/>
      <View style={{flex: 1, alignItems: 'center', margin: 30}}>
        <Text>Capital: {countries[currentCountry].capital}</Text>
        <Text>Region: {countries[currentCountry].region}</Text>
        <Text>Population: {countries[currentCountry].population}</Text>
      </View>
    </View>
  );
}
