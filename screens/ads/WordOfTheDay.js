import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function WordOfTheDay() {
  const [word, setWord] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D",
        {
          headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key":
              "fd80f3f092msh8b3fd384bbfef5bp1bdad0jsnd84898968437",
          },
        }
      );
      const result = await response.json();
      console.log(result);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Your diurnal vocabule:</Text>
      {word ? <Text>{word}</Text> : <ActivityIndicator />}
      <Text>Acuminate your lexicon with us @ acuminateyourlexicon.online</Text>
    </View>
  );
}
