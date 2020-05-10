import React, { useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import Leaderboard from "../components/Leaderboard";
import { Avatar, SocialIcon } from "react-native-elements";
import { timeRef } from "../navigation/RootNavigator";

const leaderboard = {
  top3: [
    {
      username: "AbstractUltra",
      time: 230,
      avatar: "",
    },
    {
      username: "AvanRocks",
      time: 320,
      avatar: "",
    },
    {
      username: "Bobluge Togonom",
      time: 458,
      avatar: "",
    },
  ],
  yourRanking: 40,
};

export default function CongratulationsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation
      .dangerouslyGetParent()
      ?.setOptions({ headerTitle: "Congratulations!" });
  }, []);

  return (
    <View>
      <View
        colors={["#1da2c6", "#1695b7"]}
        style={{
          backgroundColor: "#119abf",
          padding: 15,
          paddingTop: 35,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "white" }}>Leaderboard</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              flex: 1,
              textAlign: "right",
              marginRight: 40,
            }}
          >
            4th
          </Text>
          <Avatar
            rounded
            style={{ flex: 0.66, height: 70, width: 70 }}
            source={{
              uri:
                "https://media-exp1.licdn.com/dms/image/C4D03AQEUgiIGoubZSg/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=P5pAjXfb1gKTxDqe6zJwyBffU-NHXd9SJzG7KIHAIV0",
            }}
          />
          <Text
            style={{ color: "white", fontSize: 25, flex: 1, marginLeft: 40 }}
          >
            {Math.floor(timeRef.current / 60)
              .toString()
              .padStart(1, "0")}
            :{(timeRef.current % 60).toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
      <Leaderboard
        data={leaderboard.top3}
        labelBy={"username"}
        sortBy={"time"}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          margin: 10,
        }}
      >
        Share your misery!
      </Text>
      <View
        style={{
          flex: -1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <SocialIcon type={"twitter"} />
        <SocialIcon type={"facebook"} />
        <SocialIcon type={"instagram"} />
      </View>
    </View>
  );
}
