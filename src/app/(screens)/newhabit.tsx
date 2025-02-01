// @ts-nocheck
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import HabitBottomSheet from "../../componets/bottom-sheet";

const options = [
  "Select option",
  "UX Research",
  "Web Development",
  "Cross Platform Development Process",
  "UI Designing",
  "Backend Development",
];

const NewHabits = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [text, setText] = useState("");
  const [habitName, sethabitName] = useState("");
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 200;
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleSubmitHabit = () => {
    // Validate form
    if (!form.habit.trim()) {
      Alert.alert("Error", "Please enter a habit name");
      return;
    }

    if (form.category === "Select option") {
      Alert.alert("Error", "Please select a category");
      return;
    }

    // Here you would typically send the habit to your backend or state management
    // console.log("New Habit Submitted:", form);

    // Optional: Reset form after submission
    setForm({ habit: "", category: "" });
    setSelectedOption(options[0]);
  };
  const selectOption = (option: string) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  useEffect(() => {
    if (!isOpen) {
      animatedHeight.setValue(0);
    }
  }, [isOpen]);
  const handleSelctedOption = (option) => {
    setform({ ...form, category: option });
    selectOption(option);
  };
  // console.log(form);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create new Habit</Text>

        <View className="flex flex-col gap-7">
          <TextInput
            mode="outlined"
            selectionColor="#666666"
            cursorColor="#666666"
            outlineColor="#666666"
            activeOutlineColor="#fff"
            style={styles.textInput}
            label="New Habit"
            value={habitName}
            onChangeText={(text) => sethabitName(text)}
          />

          <View className="flex flex-row items-center justify-between ">
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={toggleDropdown}
              >
                <Text style={styles.selectButtonText}>{selectedOption}</Text>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <Animated.View
                style={[styles.dropdown, { maxHeight: animatedHeight }]}
              >
                <ScrollView>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.option,
                        selectedOption === option && styles.selectedOption,
                      ]}
                      onPress={handleSelctedOption}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                      {selectedOption === option && (
                        <Ionicons name="checkmark" size={20} color="white" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </View>
            <View>
              <Button
                mode="contained"
                onPress={() => router.push("newcategory")}
                style={styles.submitButton}
                labelStyle={{ color: "white", fontFamily: "Poppins-SemiBold" }}
              >
                New
              </Button>
              
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmitHabit}
            style={styles.submitButton}
            labelStyle={{ color: "white", fontFamily: "Poppins-SemiBold" }}
          >
            Create Habit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewHabits;

const styles = StyleSheet.create({
  submitButton: {
    // marginTop: 20,
    backgroundColor: "#D62059",
    borderRadius: 7,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#18181B",
  },
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#c",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    color: "#D62059",
    fontSize: 21,
    marginBottom: 20,
  },
  textInput: {
    fontFamily: "Poppins-SemiBold",
    backgroundColor: "#18181B",
    // marginBottom: 20,
  },
  dropdownContainer: {
    width: "60%",
    zIndex: 1000,
  },
  selectButton: {
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "black",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#18181B",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
  },
});
