import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "User Inexperience",
    text: "This app is intended to have awful UX",
    bg: "#59b2ab",
  },
  {
    key: 2,
    title: "UI",
    text: "But we have good UI",
    bg: "#febe29",
  },
];

function _renderSlide({ item, index, dimensions }) {
  return (
    <View style={[styles.slide, { backgroundColor: item.bg }]}>
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
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});
