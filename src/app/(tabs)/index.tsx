import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../utils/colors";
import {
  getAchievements,
  getHabitCompletions,
  getHabits,
} from "../../../utils/storage";
import { MD3Colors, ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import habits from "./habit";
interface Achievement {
  id: string;
  title: string;
  description?: string;
}
interface Habits {
  id: string;
  habittitle: string;
  description?: string;
  priority?: string;
}

const Home = () => {
  const thoughts = [
    "Believe in yourself, and you will achieve great things.",
    "Discipline is the bridge between goals and accomplishment.",
    "You must do the things you think you cannot do.",
    "Goals are dreams with deadlines.",
    "You can, you should, and if you're brave enough to start, you will.",
  ];

  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [HabitList, setHabitList] = useState<Habits[]>([]);
  const [completions, setCompletions] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThoughtIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 5000); // Changes thought every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
const fetchHabit = async () => {
  try {
    const habits = await getHabits();
    setHabitList(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};

useEffect(() => {
  fetchHabit();
}, []);
  const fetchAchievements = async () => {
    try {
      const fetchedAchievements = await getAchievements();
      setAchievements(fetchedAchievements);
    } catch (error) {
      console.error("Error in fetchAchievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);
  const loadHabits = async () => {
    try {
      const storedCompletions = await getHabitCompletions();
      setCompletions(storedCompletions || {});
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);
  return (
    <View
      style={{ backgroundColor: colors.PRIMARY_BG }}
      className="h-full w-full p-6 flex flex-col gap-8"
    >
      <View>
        <Text
          style={{ fontFamily: "Geist-Medium", color: colors.PRIMARY_TEXT }}
          className="text-4xl"
        >
          Hey
        </Text>
        <Text
          style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
          className="text-4xl"
        >
          Champion 👋
        </Text>
      </View>
      <Text
        style={{ fontFamily: "", color: colors.PRIMARY_TEXT }}
        className="text-[20px] opacity-70 "
      >
        "{thoughts[currentThoughtIndex]}"
      </Text>

      <View className="flex flex-col gap-3 w-full mt-12">
        <View
          style={{ backgroundColor: colors.LIGHT_BG }}
          className="p-5 items-center w-full rounded-lg flex flex-col gap-3"
        >
          <View className="flex flex-row gap-2 items-baseline justify-center py-4">
            <Text
              className="text-5xl"
              style={{ color: colors.PRIMARY_TEXT, fontFamily: "Geist-Medium" }}
            >
              {HabitList.length}/{HabitList.length}
            </Text>
            {/* <Ionicons
              name="book-outline"
              size={18}
              color={colors.PRIMARY_TEXT}
            /> */}
            <Text
              className="text-[16px] opacity-70"
              style={{ color: colors.PRIMARY_TEXT, fontFamily: "Geist-Medium" }}
            >
              Habits Completed
            </Text>
          </View>
          <ProgressBar progress={0.5} color={colors.PRIMARY_TEXT} />
        </View>
        <View className="flex flex-row gap-4 w-full">
          <View
            className="w-[57%]  px-4  py-2rounded-lg flex flex-col items-start justify-center"
            style={{ backgroundColor: colors.LIGHT_BG }}
          >
            <View className="flex flex-row items-center gap-2">
              <Text style={{ color: colors.PRIMARY_TEXT }}>Pomodoro</Text>
              <Ionicons name="timer" size={24} color={colors.PRIMARY_TEXT} />
            </View>
            <View className="flex flex-row ">
              <View>
                <Text
                  style={{ color: colors.PRIMARY_TEXT }}
                  className="text-2xl font-bold"
                >
                  30 mins{" "}
                </Text>
                <Text
                  style={{ color: colors.PRIMARY_TEXT }}
                  className="text-sxl"
                >
                  {" "}
                  worked today
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ backgroundColor: colors.LIGHT_BG }}
            className="rounded-lg px-4 py-6 flex flex-col  w-[38%] items-center justify-center"
          >
            <View className="flex flex-row items-baseline gap-1">
              <Text
                style={{
                  fontFamily: "Geist-Medium",
                  color: colors.PRIMARY_TEXT,
                }}
                className="text-6xl"
              >
                {achievements.length}
              </Text>
              <Ionicons name="trophy" size={18} color={colors.PRIMARY_TEXT} />
            </View>
            <Text
              style={{
                color: colors.PRIMARY_TEXT + 80,
              }}
              className="text-base flex flex-row items-center"
            >
              Achievement{" "}
            </Text>
          </View>{" "}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
