import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import BasicCalendar from "../../componets/calendar";
import "../../../global.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Appbar } from "react-native-paper";
import HeaderBar from "../../componets/header";
import colors from "../(screens)/newhabit";
const habits = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-zinc-900 ">
        <HeaderBar title="Habits" icon1="magnify" icon2="calendar" />
        <BasicCalendar />
        <Link
          href={"/(screens)/newhabit"}
          className="absolute bottom-8 right-8 m-2  "
        >
          <View className="bg-[#D62059] p-3 rounded-full">
            <Ionicons name="add-outline" size={28} color="#fff" />
          </View>
        </Link>
      </View>
      
    </SafeAreaView>
  );
};

export default habits;

const styles = StyleSheet.create({});
