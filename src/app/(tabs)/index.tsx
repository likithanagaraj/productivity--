import { Platform, SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import BasicCalendar from "../../componets/calendar";
import "../../../global.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Appbar,
  Button,
  Checkbox,
  Modal,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import HeaderBar from "../../componets/header";
import colors from "../../../utils/colors";
import { getHabits } from "../../../utils/storage";
import ConfettiCannon from 'react-native-confetti-cannon';

interface Habits {
  id: string;
  habittitle: string;
  description?: string;
  priority?: string;
}

const habits = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [HabitList, setHabitList] = useState<Habits[]>([]);
  const [checkedHabits, setCheckedHabits] = useState<{ [key: string]: boolean }>({});
  const [visible, setVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habits | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const sortHabits = (habits: Habits[]) => {
    return [...habits].sort((a, b) => {
      // First, sort by completion status
      const aCompleted = checkedHabits[a.id] ? 1 : 0;
      const bCompleted = checkedHabits[b.id] ? 1 : 0;
      
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

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#FF4444";
      case "medium":
        return "#FFBB33";
      default:
        return "#00C851";
    }
  };

  const loadHabits = async () => {
    try {
      setRefreshing(true);
      const storedHabits = await getHabits();
      const sortedHabits = sortHabits(storedHabits);
      setHabitList(sortedHabits);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, [checkedHabits]); // Re-sort when checked habits change

  useFocusEffect(
    React.useCallback(() => {
      loadHabits();
    }, [])
  );

  const hideModal = () => {
    setVisible(false);
    setSelectedHabit(null);
    setShowConfetti(false);
  };

  const toggleHabit = (habit: Habits) => {
    const isCurrentlyUnchecked = !checkedHabits[habit.id];
    
    if (isCurrentlyUnchecked) {
      setSelectedHabit(habit);
      setVisible(true);
      setTimeout(() => setShowConfetti(true), 100);
    } else {
      setCheckedHabits((prev) => ({
        ...prev,
        [habit.id]: false,
      }));
    }
  };

  const confirmHabitCompletion = () => {
    if (selectedHabit) {
      setCheckedHabits((prev) => ({
        ...prev,
        [selectedHabit.id]: true,
      }));
    }
    hideModal();
  };

  const renderHabitItem = (habit: Habits) => {
    const isCompleted = checkedHabits[habit.id];
    
    const handleEdit = ()=>{
      router.push(`/newhabit?id=${habit.id}`);
    }
    return (
      <View
        key={habit.id}
        className="mb-4 p-4 rounded-lg flex flex-row items-center"
        style={{
          backgroundColor: colors.CTA,
          opacity: isCompleted ? 0.6 : 1,
        }}
      >
        <View className="flex-1">
          <Text
          onPress={handleEdit}
            style={{
              color: colors.PRIMARY_BG,
              fontFamily: "Geist-Bold",
              fontSize: 16,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
            }}
          >
            {habit.habittitle}
          </Text>
          {habit.description && (
            <Text
              style={{
                color: colors.LIGHT_BG,
                fontFamily: "Geist-Light",
                fontSize: 12,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
              }}
              className="text-sm mt-1"
            >
              {habit.description}
            </Text>
          )}
        </View>
        <View>
          <Checkbox
            status={isCompleted ? "checked" : "unchecked"}
            onPress={() => toggleHabit(habit)}
            color={colors.PRIMARY_BG}
            uncheckedColor={colors.PRIMARY_BG}
          />
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <View
          style={{ backgroundColor: colors.PRIMARY_BG }}
          className="h-full w-full flex flex-col gap-8"
        >
          <View>
            <HeaderBar title="Habits" icon1="magnify" icon2="calendar" />
            <BasicCalendar />
          </View>
          <View className="p-5">
            {HabitList.length > 0 ? (
              sortHabits(HabitList).map(renderHabitItem)
            ) : (
              <Text
                style={{
                  color: colors.CTA,
                  fontFamily: "Geist-Bold",
                  fontSize: 16,
                }}
                className="text-center mt-4"
              >
                No Habits Found
              </Text>
            )}
          </View>
          <Link
            href={"/(screens)/newhabit"}
            className="absolute bottom-8 right-8 m-2"
          >
            <View
              style={{ backgroundColor: colors.PRIMARY_TEXT }}
              className="p-3 rounded-full"
            >
              <Ionicons name="add" size={28} color={colors.PRIMARY_BG} />
            </View>
          </Link>

          <Portal>
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
                <Ionicons
                  name="trophy"
                  size={64}
                  color={colors.CTA}
                  className="self-center"
                />
                <Text
                  style={{
                    color: colors.PRIMARY_TEXT,
                    fontFamily: "Geist-Bold",
                    fontSize: 18,
                  }}
                >
                  WELL DONE
                </Text>
                <View className="flex flex-row justify-end gap-4 mt-4">
                  <Button
                    onPress={confirmHabitCompletion}
                    textColor={colors.PRIMARY_BG}
                    buttonColor={colors.CTA}
                    mode="contained"
                    style={{borderRadius: 5, paddingHorizontal: 20}}
                  >
                    OK
                  </Button>
                </View>
              </View>
            </Modal>
            {showConfetti && (
              <ConfettiCannon
                count={50}
                origin={{x: windowWidth / 2, y: windowHeight / 2}}
                autoStart={true}
                fadeOut={true}
                explosionSpeed={350}
                fallSpeed={3000}
                colors={[colors.CTA, colors.PRIMARY_TEXT, '#FFD700', '#FF69B4']}
              />
            )}
          </Portal>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default habits;