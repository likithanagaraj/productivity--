import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import BasicCalendar from "../../componets/calendar";
import "../../../global.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Appbar,
  Button,
  Modal,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import HeaderBar from "../../componets/header";
import colors from "../../../utils/colors";
import {
  getHabits,
  storeHabitCompletion,
  getHabitCompletions,
  Habits,
} from "../../../utils/storage";
// import ConfettiCannon from 'react-native-confetti-cannon';
import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}

const habits = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [HabitList, setHabitList] = useState<Habits[]>([]);
  const [completions, setCompletions] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [visible, setVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habits | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const sortHabits = (habits: Habits[]) => {
    return [...habits].sort((a, b) => {
      // First, sort by completion status
      const aCompleted = completions[selectedDate]?.[a.id] ? 1 : 0;
      const bCompleted = completions[selectedDate]?.[b.id] ? 1 : 0;

      if (aCompleted !== bCompleted) {
        return aCompleted - bCompleted;
      }

      // If completion status is the same, sort by priority
      const getPriorityValue = (priority?: string) => {
        switch (priority?.toLowerCase()) {
          case "high":
            return 2;
          case "medium":
            return 1;
          default:
            return 0;
        }
      };

      return getPriorityValue(b.priority) - getPriorityValue(a.priority);
    });
  };

  const loadHabits = async () => {
    try {
      setRefreshing(true);
      const storedHabits = await getHabits();
      const storedCompletions = await getHabitCompletions();
      interface HabitWithCheckStatus extends Habits {
        isChecked: boolean;
      }

      const habitsWithCheckStatus: HabitWithCheckStatus[] = storedHabits.map(
        (habit: Habits) => ({
          ...habit,
          isChecked: storedCompletions?.[selectedDate]?.[habit.id] || false,
        })
      );
      setCompletions(storedCompletions || {});
      const sortedHabits = sortHabits(habitsWithCheckStatus);
      setHabitList(sortedHabits);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, [selectedDate]);

  useFocusEffect(
    React.useCallback(() => {
      loadHabits();
    }, [])
  );

  const hideModal = async () => {
    setVisible(false);
    setSelectedHabit(null);
    setShowConfetti(false);
    if (selectedHabit) {
      const newCompletions = {
        ...completions,
        [selectedDate]: {
          ...(completions[selectedDate] || {}),
          [selectedHabit.id]: true,
        },
      };
      setCompletions(newCompletions);
      await storeHabitCompletion(newCompletions);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const toggleHabit = async (habit: Habits) => {
    const isCurrentlyUnchecked = !completions[selectedDate]?.[habit.id];
    const updatedHabit = { ...habit, isChecked: isCurrentlyUnchecked };
    if (isCurrentlyUnchecked) {
      setSelectedHabit(habit);
      setVisible(true);
      // setTimeout(() => setShowConfetti(true), 100);
    } else {
      const newCompletions = {
        ...completions,
        [selectedDate]: {
          ...(completions[selectedDate] || {}),
          [habit.id]: false,
        },
      };
      setCompletions(newCompletions);
      await storeHabitCompletion(newCompletions);
    }
  };

  const confirmHabitCompletion = async () => {
    if (selectedHabit) {
      const newCompletions = {
        ...completions,
        [selectedDate]: {
          ...(completions[selectedDate] || {}),
          [selectedHabit.id]: true,
        },
      };
      setCompletions(newCompletions);
      await storeHabitCompletion(newCompletions);
    }
    hideModal();
  };

  const congratsEmojis = ["🎉", "🎊", "🥳", "👏", "👍", "🙌", "👌", "🤩	", "🥇"];
  const renderHabitItem = (habit: Habits) => {
  
    const isCompleted = completions[selectedDate]?.[habit.id];

    const handleEdit = () => {
      router.push({
        pathname: "/newhabit",
        params: { id: habit.id },
      });
    };
    const  OnPressFuntion =()=>{
      console.log("Long Pressed")
    }
    return (
      <Pressable
      onLongPress={OnPressFuntion}
        key={habit.id}
        onPress={() => toggleHabit(habit)}
        className="mb-4 px-4  rounded-lg flex flex-row items-center justify-between bg-LIGHT_BG"
        style={{
          opacity: isCompleted ? 0.6 : 1,
          paddingVertical: habit.priority ? 12 : 9,
        }}
      >
        <View className="">
          {habit.priority && (
            <Text

              style={
                habit.priority === "Medium"
                  ? styles.MediumP
                  : habit.priority === "High"
                  ? styles.highP
                  : styles.LowP
              }
            >
              {habit.priority}
            </Text>
          )}
          <Text
            onPress={handleEdit}
            className="font-Geist text-PRIMARY_TEXT"
            style={{
              textDecorationLine: isCompleted ? "line-through" : "none",
            }}
          >
            {habit.habittitle}
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Checkbox
            value={isCompleted}
            onValueChange={() => toggleHabit(habit)}
            style={{width: 15, height: 15}}
            color={colors.PRIMARY_TEXT}
            // className="w-[15px] h-[15px]"
            
          />
        </View>
        
      </Pressable>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <View
          
          className="h-full w-full flex flex-col gap-8 bg-PRIMARY_BG"
        >
          <View>
            <HeaderBar title="Habits" icon1="magnify" icon2="calendar" />
            <BasicCalendar
              onSelectDate={handleDateSelect}
              selectedDates={new Date(selectedDate)}
            />
          </View>
          <ScrollView>
            <View  className="p-4">
              {HabitList.length > 0 ? (
                sortHabits(HabitList).map(renderHabitItem)
              ) : (
                <Text
                  style={{
                    color: colors.CTA,
                    fontFamily: "Geist-Bold",
                    fontSize: 16,
                  }}
                  className="text-center mt-4 text-TextCTA"
                >
                  No Habits Found
                </Text>
              )}
            </View>
          </ScrollView>
          
          <Link
            href={"/(screens)/newhabit"}
            className="absolute bottom-8 right-8 m-"
          >
            <View
              className="p-3 rounded-full bg-BG"
            >
              
              <Ionicons name="add" size={28} color={colors.PRIMARY_BG} />
            </View>
          </Link>

          <Portal >
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: colors.PRIMARY_BG,
                padding: 20,
                margin: 20,
                borderRadius: 8,
              }}
              
            >
              <View className="flex flex-col gap-4 items-center justify-center">
                {/* <Ionicons
                  name="trophy"
                  size={64}
                  // color={colors.CTA}
                  className="self-center bg-white"
                /> */}
                <Text
                  className="text-PRIMARY_TEXT font-geistBold text-[42px]" 
                >
                  {
                    congratsEmojis[
                      Math.floor(Math.random() * congratsEmojis.length)
                    ]
                  }
                </Text>
                <View className="flex flex-col items-center gap-0">
                  <Text
                    
                     className="text-PRIMARY_TEXT font-geistBold text-[18px]"
                  >
                    WELL DONE
                  </Text>
                  <Text
                   
                    className="text-PRIMARY_TEXT/70 text-xs"
                  >
                    You've completed a habit
                  </Text>
                </View>
                <View className="flex flex-row justify-end gap-4 mt-4">
                  <Button
                  
                    onPress={confirmHabitCompletion}
                    // textColor={colors.PRIMARY_BG}
                    buttonColor={colors.CTA}
                    mode="contained"
                    className="rounded-md px-[20px]"
                  >
                    OK
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>
        
        </View>
      
      </SafeAreaView>
    </PaperProvider>
  );
};

export default habits;

const styles = StyleSheet.create({
  highP: {
    color: "red",
    fontFamily: "Geist-Light",
    fontSize: 10,
  },
  MediumP: {
    color: "yellow",
    fontFamily: "Geist-Light",
    fontSize: 10,
  },
  LowP: {
    color: "green",
    fontFamily: "Geist-Light",
    fontSize: 10,
  },
});
