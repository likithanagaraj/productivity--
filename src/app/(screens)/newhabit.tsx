import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import colors from "../../../utils/colors";
import { saveHabits } from "../../../utils/storage";

import 'react-native-get-random-values';

const Newhabit = () => {
  const {id} = useLocalSearchParams()
  
  const generateId = () => {
    return crypto.randomUUID(); // Generates a universally unique identifier (UUID)
  };
  
  const [value, setValue] = React.useState("");
  const [habitName, sethabitName] = useState("");
  const [description, setdescription] = useState("");
  const [errors, seterrors] = useState("");
  const handleSubmitHabit = async() => {
    if (habitName.trim() === "") {
      seterrors("Please enter a habit name");
      return;
    }
    try {
      const newhabit = {
        id: generateId(),
        habittitle: habitName.trim(),
        description: description,
        priority: value,
      };
      await saveHabits(newhabit);
      router.push("/");
    } catch (error) {
       Alert.alert('Error', 'Failed to save task');
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: colors.PRIMARY_BG }}
        className=" h-full w-full px-6 py-8 flex flex-col justify-between"
      >
        <View className="flex flex-col gap-8">
          <Text
            style={{ fontFamily: "Geist-SemiBold", color: colors.PRIMARY_TEXT }}
            className=" text-[22px]  "
          >
            Create Habit
          </Text>

          <View className="flex flex-col gap-5">
            <View>
              <TextInput
                mode="outlined"
                style={{
                  backgroundColor: colors.LIGHT_BG,
                  fontFamily: "Geist-Regular",
                  color: colors.PRIMARY_TEXT,
                }}
                cursorColor="#666666"
                outlineColor="#666666"
                activeOutlineColor={colors.CTA}
                label={id ? "Edit Habit🤣" : "Enter task name"}
                value={habitName}
                onChangeText={(text) => sethabitName(text)}
              />
              {errors && <Text className="text-red-500">{errors}</Text>}
            </View>
            <TextInput
              mode="outlined"
              style={{
                backgroundColor: colors.LIGHT_BG,
                fontFamily: "Geist-Regular",
                color: colors.PRIMARY_TEXT,
                paddingBottom: 35,
              }}
              cursorColor="#666666"
               outlineColor="#666666"
              activeOutlineColor={colors.CTA}
              label="Enter task Description"
              value={description}
              onChangeText={(text) => setdescription(text)}
            />

            <SafeAreaView >
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: "Low",
                    label: "Low",
                    testID: "1",
                    style: {
                      borderRadius: 5,
                      borderColor: "#666666",
                      
                      backgroundColor:
                        value === "Low" ? colors.CTA : colors.LIGHT_BG,
                    },
                    labelStyle: {
                      color:
                        value === "Low"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "Low" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                  {
                    value: "Medium",
                    label: "Medium",
                    testID: "2",
                    style: {
                      backgroundColor:
                        value === "Medium" ? colors.CTA : colors.LIGHT_BG,
                      borderColor: "#666666",

                    },
                    labelStyle: {
                      color:
                        value === "Medium"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "Medium" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                  {
                    value: "High",
                    label: "High",
                    testID: "3",
                    style: {
                      borderRadius: 5,
                      borderColor: "#666666",
                      backgroundColor:
                        value === "High" ? colors.CTA : colors.LIGHT_BG,
                    },
                    labelStyle: {
                      color:
                        value === "High"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "High" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                ]}
              />
            </SafeAreaView>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmitHabit}
          style={styles.submitButton}
          labelStyle={{
            color: colors.PRIMARY_BG,
            fontFamily: "Geist-Bold",
          }}
        >
          Create Habit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Newhabit;

const styles = StyleSheet.create({
  submitButton: {
    // marginTop: 20,
    backgroundColor: colors.CTA,

    borderRadius: 7,
  },
});
