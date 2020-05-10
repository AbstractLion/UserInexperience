import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import randomWords from "random-words";

export default function WordOfTheDayAd() {
  const [word, setWord] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://similarwords.p.rapidapi.com/moar?query=${randomWords()}`,
        {
          headers: {
            "x-rapidapi-host": "similarwords.p.rapidapi.com",
            "x-rapidapi-key":
              "fd80f3f092msh8b3fd384bbfef5bp1bdad0jsnd84898968437",
          },
        }
      );
      const result = await response.json();
      setWord(result.result[0]);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Text style={{ fontSize: 20 }}>
        Your diurnal vocabule (word of the day):
      </Text>
      {word ? (
        <Text style={{ fontSize: 30, fontWeight: "bold", margin: 30 }}>
          {word}
        </Text>
      ) : (
        <ActivityIndicator style={{ margin: 20 }} />
      )}
      <Text style={{ textAlign: "center" }}>
        Acuminate your lexicon with us @ acuminateyourlexicon.online
      </Text>
    </View>
  );
}
