import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import BasicCalendar from "../../componets/calendar";
import "../../../global.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Appbar, TextInput } from "react-native-paper";
import HeaderBar from "../../componets/header";
import colors from "../(screens)/newhabit";

const newHabits = () => {
  const [text, setText] = React.useState("");
  return (
    <View style={{}} className="h-full w-full bg-zinc-900 p-8">
      <Text
        style={{ fontFamily: "Poppins-SemiBold" }}
        className="text-white text-xl"
      >
        Create new Habit
      </Text>

      <TextInput
        mode="outlined"
        selectionColor="#666666"
        cursorColor="#666666"
        outlineColor="#666666"
        activeOutlineColor="#666666"
        style={{ fontFamily: "Poppins-SemiBold", backgroundColor: "#18181B" }}
        label="New Habit"
        className=""
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

export default newHabits;

const styles = StyleSheet.create({});
