// @ts-nocheck
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
// import HabitBottomSheet from "../../componets/bottom-sheet";
import colors from "../../../utils/colors";
import BottomSheet from "@gorhom/bottom-sheet";

const options = [
  "Select option",
  "UX Research",
  "Web Development",
  "Cross Platform Development Process",
  "UI Designing",
  "Backend Development",
];

const Booleancategory = () => {
  const router = useRouter();
  const [habitName, sethabitName] = useState("");
  const [description, setdescription] = useState("");
  const [error, seterror] = useState("");

  const handleSubmitHabit = () => {
    if (habitName.trim() === "") {
      seterror("Please enter a habit name");
      return;
    }
    router.push("/habit-schedule");
    // setError("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Define Your Habit</Text>

        <View className="flex flex-col gap-7">
          <View>
            <TextInput
              mode="outlined"
              selectionColor="#666666"
              cursorColor="#666666"
              outlineColor="#666666"
              activeOutlineColor={colors.CTA}
              label="Habit Name"
              value={habitName}
              onChangeText={(text) => sethabitName(text)}
            />
            {error && <Text style={{color:colors.CTA}}>{error}</Text>}
          </View>
          <TextInput
            mode="outlined"
            selectionColor="#666666"
            cursorColor="#666666"
            outlineColor="#666666"
            activeOutlineColor={colors.CTA}
            label="Description"
            value={description}
            onChangeText={(text) => setdescription(text)}
          />

          <Button
            mode="contained"
            onPress={handleSubmitHabit}
            style={styles.submitButton}
            labelStyle={{ color: "white", fontFamily: "Poppins-SemiBold" }}
          >
            Create Habit
          </Button>
          {/* <BottomSheet/> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booleancategory;

const styles = StyleSheet.create({
  submitButton: {
    // marginTop: 20,
    backgroundColor: "#D62059",
    borderRadius: 7,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
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
