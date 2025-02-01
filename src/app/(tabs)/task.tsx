import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../componets/header";
import { Button } from "react-native-paper";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { getTasks, deleteTask } from "../../../utils/storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
interface Tasks {
  id: string;
  title: string;
  subtasks: string[];
}
import Checkbox from "expo-checkbox";
const Task = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  const loadTasks = async () => {
    try {
      setRefreshing(true);
      const storedTasks = await getTasks();
      setTasks(storedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );
  const handledelete = (id: any) => {
    console.log("Delete");
    deleteTask(id);
    loadTasks();
  };
  
  const handleCheckbox = (taskId: string, subtaskIndex: number) => {
    const key = `${taskId}-${subtaskIndex}`;
    setCheckedStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (
    <View className="h-full w-full bg-zinc-900 ">
      {/* <HeaderBar title="Task" icon1="magnify" icon2="calendar" /> */}
      <View className="p-5  ">
        <Text
          style={{ fontFamily: "Poppins-SemiBold", marginBottom: 20 }}
          className="text-white text-3xl  "
        >
          Task
        </Text>
        <ScrollView className="mb-5">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <View
                key={task.id}
                className="p-4 bg-gray-800 rounded-lg mb-3 flex justify-between items-center flex-row gap-2"
              >
                <View className="flex flex-col gap-3">
                  <Text className="text-white text-lg font-bold">
                    {task.title}
                  </Text>
                  {task.subtasks.map((sub: string, index: number) => {
                     const checkboxKey = `${task.id}-${index}`;
                    return(
                      <View key={index} className="flex flex-row gap-3 items-center">
                      <Checkbox
                         style={{ width: 18, height: 18 }}
                         value={checkedStates[checkboxKey] || false}
                         onValueChange={() => handleCheckbox(task.id, index)}
                       />
                      <Text className={checkedStates[checkboxKey] ? "text-white line-through" : "text-white"}>
                         {sub}
                       </Text>
                   </View>
                    )
                  })}
                </View>
                <View className="flex flex-row gap-5">
                  <FontAwesome
                    onPress={() =>
                      router.push({
                        pathname: "/(screens)/newtask",
                        params: {
                          id: task.id,
                          task: task.title,
                          subtasks: JSON.stringify(task.subtasks),
                        },
                      })
                    }
                    name="edit"
                    size={18}
                    color="white"
                  />
                  <FontAwesome
                    onPress={() => handledelete(task.id)}
                    name="trash"
                    size={18}
                    color="white"
                  />
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-400">No tasks added yet.</Text>
          )}
        </ScrollView>

        <Link href={"/(screens)/newtask"}>
          <Button
            labelStyle={{ fontFamily: "Poppins-SemiBold" }}
            style={{ width: 200 }}
            mode="contained-tonal"
            textColor="white"
            buttonColor="#D62059"
          >
            Create new Task
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  checkbox: {
    margin: 2,
  },
});
