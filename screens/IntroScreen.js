import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "User Inexperience",
    text:
      "Welcome to the only app that has a less-than-ok excuse for having terrible UX!\n\n" +
      "Currently, we only have one level available, the Todo List app. However, we hope to add more in the future and maybe even allow users to create their own apps with terrible UX!\n",
    bg: "#59b2ab",
  },
  {
    key: 2,
    title: "The Todo List",
    text:
      "How terrible can the UX of your app really be? Well, we decided to take the humble todo list app and turn it into perhaps the worst UX you'll ever deal with. That is, until we release our next level.\n\n" +
      "Your task: Create an item in our todo list app. The name doesn't matter, and the account details don't matter.\n\n" +
      "Press the \"Done\" button on the right when you're ready. As soon as you press that button, the stopwatch will start and you'll be in the race to finish your task as quickly as possible.",

    bg: "#eeae19",
  },
];

function _renderSlide({ item, index, dimensions }) {
  return (
    <View style={[styles.slide, { backgroundColor: item.bg, padding: 20 }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

export default function IntroScreen({ onDone }) {
  return (
    <AppIntroSlider
      data={slides}
      showSkipButton={true}
      showPrevButton={true}
      renderItem={_renderSlide}
      keyExtractor={(item) => item.key.toString()}
      onDone={onDone}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 5,
    color: "white",
    textAlign: "center",
  },
});
