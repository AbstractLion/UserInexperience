import React, { useContext, useEffect } from "react";
import GeoProAd from "./ads/GeoProAd";
import WordOfTheDayAd from "./ads/WordOfTheDayAd";
import UserContext from "../contexts/UserContext";
import NumberFactAd from "./ads/NumberFactAd";

const ads = [GeoProAd, WordOfTheDayAd, NumberFactAd];

export default function AdScreen({ navigation, route }) {
  const { user, setUser } = useContext(UserContext);

  console.log("hi");
  useEffect(() => {
    return () => setUser({ ...user, adPosition: user.adPosition + 1 });
  }, []);

  return React.createElement(ads[user.adPosition % ads.length], {});
}
