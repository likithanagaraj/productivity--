import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../utils/colors";

const Home = () => {
  const thoughts = [
    "Believe in yourself, and you will achieve great things.",
    "Discipline is the bridge between goals and accomplishment.",
    "You must do the things you think you cannot do.",
    "Goals are dreams with deadlines.",
    "You can, you should, and if you're brave enough to start, you will."
  ];

  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThoughtIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 5000); // Changes thought every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View
      style={{ backgroundColor: colors.PRIMARY_BG }}
      className="h-full w-full p-8 flex flex-col gap-20"
    >
      <Text
        style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
        className="text-2xl"
      >
        Hey Champion 👋
      </Text>
      <View className="flex flex-col gap-3">
        <Text
          style={{ fontFamily: "Geist-Medium", color: colors.PRIMARY_TEXT + 80 }}
          className="text-lg"
        >
          Thought for the day
        </Text>
        <View style={{ backgroundColor: colors.LIGHT_BG }} className="rounded-md">
          <Text
            style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
            className="text-2xl p-5"
          >
            "{thoughts[currentThoughtIndex]}"
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
