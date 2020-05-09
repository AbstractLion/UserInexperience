import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ActivityIndicator from "react-native-web/dist/exports/ActivityIndicator";

export default function WordOfTheDay() {
  const [word, setWord] = useState("");

  useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <View>
      <Text>Your diurnal vocabule:</Text>
      {word ? <Text>{word}</Text> : <ActivityIndicator />}
      <Text>Acuminate your lexicon with us @ acuminateyourlexicon.online</Text>
    </View>
  );
}
