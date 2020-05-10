import React from "react";
import { View, Text, Image } from "react-native";
import Leaderboard from "../components/Leaderboard";
import { Avatar, SocialIcon } from "react-native-elements";

const leaderboard = {
  top3: [
    {
      username: "AbstractUltra",
      time: 230,
      avatar: "",
    },
    {
      username: "Avaneesh",
      time: 320,
      avatar: "",
    },
    {
      username: "LeonZaLion",
      time: 458,
      avatar: "",
    },
  ],
  yourRanking: 40,
};

export default function CongratulationsScreen() {
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
            24:30
          </Text>
        </View>
      </View>
      <Leaderboard
        data={leaderboard.top3}
        labelBy={"username"}
        sortBy={"time"}
      />
      <View
        style={{
          flex: -1,
          flexDirection: "row",
          width: "100%",
          justifyContext: "space-around",
        }}
      >
        <SocialIcon type={"twitter"} />
        <SocialIcon type={"facebook"} />
        <SocialIcon type={"instagram"} />
      </View>
    </View>
  );
}
