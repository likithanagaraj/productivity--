// @ts-nocheck
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../utils/colors";
import {
  Achievement,
  getAchievements,
  getHabitCompletions,
  getHabits,
  Habits,
  PomodoroStorage,
  saveHabits,
  storeHabitCompletion,
} from "../../../utils/storage";
import { MD3Colors, ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Define types
interface CompletionType {
  [key: string]: { [key: string]: boolean };
}

const Home = () => {
  const thoughts = [
    "Believe in yourself, and you will achieve great things.",
    "Discipline is the bridge between goals and accomplishment.",
    "You must do the things you think you cannot do.",
    "Goals are dreams with deadlines.",
    "You can, you should, and if you're brave enough to start, you will.",
  ];

  // State management
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [habitList, setHabitList] = useState<Habits[]>([]);
  const [completions, setCompletions] = useState<CompletionType>({});
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Pomodoro, setPomodoro] = useState(0);

  // Helper function to get today's date
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Update habit completion status
  const updateHabitCompletion = async (
    habitId: string,
    isCompleted: boolean
  ) => {
    try {
      const updatedHabits = habitList.map((habit) =>
        habit.id === habitId ? { ...habit, isCompleted } : habit
      );

      const today = getTodayDate();
      const newCompletions = {
        ...completions,
        [today]: {
          ...(completions[today] || {}),
          [habitId]: isCompleted,
        },
      };

      // Save both to storage
      await Promise.all([
        saveHabits(updatedHabits),
        storeHabitCompletion(newCompletions),
      ]);
      useEffect(() => {
        const updateHabits = async () => {
          await fetchHabits();
        };
        updateHabits();
      }, [completions]);

      // Update state
      setHabitList(updatedHabits);
      setCompletions(newCompletions);
    } catch (error) {
      console.error("Error updating habit completion:", error);
    }
  };

  // Fetch habits and their completion status
  const fetchHabits = async () => {
    try {
      const habits = await getHabits();
      const today = getTodayDate();
      const todayCompletions = completions[today] || {};

      const updatedHabits = habits.map((habit) => ({
        ...habit,
        isCompleted: todayCompletions[habit.id] || false,
      }));

      setHabitList(updatedHabits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  // Fetch achievements
  const fetchAchievements = async () => {
    try {
      const fetchedAchievements = await getAchievements();
      setAchievements(fetchedAchievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  // Load habit completions
  const loadCompletions = async () => {
    try {
      const storedCompletions = await getHabitCompletions();
      setCompletions(storedCompletions || {});
    } catch (error) {
      console.error("Error loading completions:", error);
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    const completedCount = habitList.filter(
      (habit) => habit.isCompleted
    ).length;
    return habitList.length > 0 ? completedCount / habitList.length : 0;
  };

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          loadCompletions(),
          fetchHabits(),
          fetchAchievements(),
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [completions]);

  // Rotating thoughts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThoughtIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Refresh habits when completions change
  useEffect(() => {
    fetchHabits();
  }, [completions]);
  // const savedTime = await PomodoroStorage.loadTime();
  const completedCount = habitList.filter((habit) => habit.isCompleted).length;
  const progress = calculateProgress();
  const progressNumber = `${completedCount}/${habitList.length}`;
  // console.log(progress)

  // Add formatting function for pomodoro time
  const formatPomodoroTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} mins`;
  };

  // Add effect to load pomodoro time
  useEffect(() => {
    const loadPomodoroTime = async () => {
      try {
        const savedTime = await PomodoroStorage.loadTime();
        setPomodoro(savedTime);
      } catch (error) {
        console.error("Error loading pomodoro time:", error);
      }
    };
    loadPomodoroTime();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.PRIMARY_BG }]}
      className="h-full w-full p-6 flex flex-col gap-8"
    >
      {/* Header */}
      <View>
        <Text
          style={[styles.headerText, { color: colors.PRIMARY_TEXT }]}
          className="text-4xl"
        >
          Hey
        </Text>
        <Text
          style={[styles.headerBoldText, { color: colors.PRIMARY_TEXT }]}
          className="text-4xl"
        >
          Champion 👋
        </Text>
      </View>

      {/* Motivational Thought */}
      <Text
        style={[styles.thoughtText, { color: colors.PRIMARY_TEXT }]}
        className="text-[20px] opacity-70"
      >
        "{thoughts[currentThoughtIndex]}"
      </Text>

      {/* Main Content */}
      <View className="flex flex-col gap-3 w-full mt-12">
        {/* Progress Card */}

        <View
          style={[styles.card, { backgroundColor: colors.LIGHT_BG }]}
          className="px-4 py-6 w-full rounded-lg flex flex-col gap-1"
        >
          .
          <View className="flex flex-row gap-2 items-baseline  py-4">
            <Text
              className="text-5xl font-bold"
              style={[, { color: colors.PRIMARY_TEXT }]}
            >
              {progressNumber}
            </Text>
            <Text
              className="text-[16px] opacity-70"
              style={[styles.labelText, { color: colors.PRIMARY_TEXT }]}
            >
              <Ionicons
                name="book"
                className="ml-2"
                size={18}
                color={colors.PRIMARY_TEXT}
              />{" "}
              Habits Completed
            </Text>
          </View>
          <ProgressBar progress={progress} color={colors.CTA} />
        </View>

        {/* Info Cards */}
        <View className="flex flex-row gap-4 w-full">
          {/* Pomodoro Card */}
          <View
            style={[styles.pomodoroCard, { backgroundColor: colors.LIGHT_BG }]}
            className="w-[57%] px-4 py-2 rounded-lg flex flex-col items-start justify-center"
          >
            <View className="flex flex-row items-center gap-2">
              <Text style={{ color: colors.PRIMARY_TEXT }}>Pomodoro</Text>
              <Ionicons name="timer" size={24} color={colors.PRIMARY_TEXT} />
            </View>
            <View>
              <Text
                style={[styles.timeText, { color: colors.PRIMARY_TEXT }]}
                className="text-2xl font-bold"
              >
                {formatPomodoroTime(Pomodoro)}
              </Text>
              <Text style={{ color: colors.PRIMARY_TEXT }} className="text-sm">
                worked today
              </Text>
            </View>
          </View>

          {/* Achievement Card */}
          <View
            style={[
              styles.achievementCard,
              { backgroundColor: colors.LIGHT_BG },
            ]}
            className="rounded-lg px-4 py-6 flex flex-col w-[38%] items-center justify-center"
          >
            <View className="flex flex-row items-baseline gap-1">
              <Text
                style={[styles.achievementText, { color: colors.PRIMARY_TEXT }]}
                className="text-6xl"
              >
                {achievements.length}
              </Text>
              <Ionicons name="trophy" size={18} color={colors.PRIMARY_TEXT} />
            </View>
            <Text
              style={{ color: `${colors.PRIMARY_TEXT}80` }}
              className="text-base"
            >
              Achievement
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: "Geist-Medium",
  },
  headerBoldText: {
    fontFamily: "Geist-Bold",
  },
  thoughtText: {
    fontFamily: "Geist-Regular",
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  progressText: {
    fontFamily: "Geist-Medium",
  },
  labelText: {
    fontFamily: "Geist-Medium",
  },

  pomodoroCard: {
    borderRadius: 12,
    elevation: 2,
  },
  timeText: {
    fontFamily: "Geist-Medium",
  },
  achievementCard: {
    borderRadius: 12,
    elevation: 2,
  },
  achievementText: {
    fontFamily: "Geist-Medium",
  },
});

export default Home;
