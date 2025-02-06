import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { saveTask } from "../../../utils/storage";
import colors from "../../../utils/colors";

const TASKS_STORAGE_KEY = "tasks";
const NewTask = () => {
  const router = useRouter();
  const { id: idParam, task: taskParam, subtasks: subtasksParam } = useLocalSearchParams();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const [task, settask] = useState<string>(
    typeof taskParam === "string" ? taskParam : ""
  );
  const [errors, seterrors] = useState<{ task?: string }>({});
  const [subtask, setsubtask] = useState<string[]>(
    subtasksParam ? JSON.parse(subtasksParam as string) : [""]
  );

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };


  useEffect(() => {
    if (taskParam && typeof taskParam === "string") settask(taskParam);
    if (subtasksParam) setsubtask(JSON.parse(subtasksParam as string));
  }, [taskParam, subtasksParam]);

  const validateForm = () => {
    let errors: { task?: string } = {};
    if (typeof task === "string" && !task.trim()) {
      errors.task = "Task is required";
    }

    seterrors(errors);
    return Object.keys(errors).length === 0;
  };

 

  const handleSubmit = async () => {
    // console.log("1. Submit started");
    if (validateForm()) {
      try {
        const newTask = {
          id: id || generateId(),
          title: task.trim(),
          subtasks: subtask.filter(st => st.trim())
        };
        // console.log("2. New task data:", newTask);
        
        await saveTask(newTask);
        // console.log("3. Task saved successfully");
        
        router.push("/(tabs)/task");
        // console.log("4. Navigation completed");
      } catch (error) {
        // console.error("Error in handleSubmit:", error);
        Alert.alert('Error', 'Failed to save task');
      }
    }
  };

  const addSubtask = () => {
    // console.log("add subtask");
    setsubtask([...subtask, ""]);
  };

  const updateSubtask = (index: number, text: string) => {
    const updatedSubtask = [...subtask];
    updatedSubtask[index] = text;
    setsubtask(updatedSubtask);
  };
  const removeSubtask = (index: number) => {
    const filteredSubtasks = subtask.filter((_, i) => i !== index);
    setsubtask(filteredSubtasks);
  };
  
  return (
    <SafeAreaView style={{backgroundColor:colors.PRIMARY_BG}} className="h-full w-full  p-5">
      <ScrollView>
        <Text
          style={{ fontFamily: "Geist-SemiBold",color:colors.PRIMARY_TEXT }}
          className=" py-5 text-[22px]"
        >
          Create a New Task
        </Text>
        <View className="flex flex-col gap-5">
          <TextInput
            mode="outlined"
            selectionColor="#666666"
            cursorColor="#666666"
            outlineColor="#666666"
            activeOutlineColor="#fff"
            style={{backgroundColor:colors.LIGHT_BG}}
            label="Task "
            value={task}
            onChangeText={(text) => settask(text)}
          />
          {errors.task && <Text className="text-red-500">{errors.task}</Text>}
          <View>
            <Text
              style={{ fontFamily: "Geist-Regular", }}
              className=" text-[16px] text-[#9c9c9c]"
            >
              Sub Task
            </Text>

            {subtask.map((subtaskText, index) => (
              <View key={index} className="mt-5 mb-3">
                <TextInput
                  mode="outlined"
                  selectionColor="#666666"
                  cursorColor="#666666"
                  outlineColor="#666666"
                  activeOutlineColor="#fff"
                  style={{backgroundColor:colors.LIGHT_BG}}
                  label={`Subtask ${index + 1}`}
                  value={subtaskText}
                  onChangeText={(text) => updateSubtask(index, text)}
                />
                <Ionicons
                  name="trash-bin"
                  size={20}
                  color="#666666"
                  className="absolute right-5 top-5"
                  onPress={() => removeSubtask(index)}
                />
              </View>
            ))}
          </View>

          <Text
            style={{ fontFamily: "Geist-Regular" }}
            className="text-[#666666] text-[16px] text-center "
            onPress={addSubtask}
          >
            Add subtask
            {/* <Ionicons  name="add" size={20} color="#666666" />   */}
          </Text>

          <Button
            onPress={handleSubmit}
            labelStyle={{ color: colors.PRIMARY_BG, fontFamily: "Geist-SemiBold" }}
            mode="contained"
            style={styles.submitButton}
          >
            Create Task
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.CTA
  },
});
