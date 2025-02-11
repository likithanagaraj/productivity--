import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { getTasks, deleteTask, Tasks, updateTaskCompletionStatus } from "../../../utils/storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import colors from "../../../utils/colors";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";



const Task = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const loadTasks = async () => {
    try {
      setRefreshing(true);
      const storedTasks = await getTasks();
      interface CheckedStates {
        [key: string]: boolean;
      }

      interface Task {
        id: string;
        title: string;
        isCompleted: boolean;
        subtasks?: Subtask[];
      }

      interface Subtask {
        id: string;
        title: string;
        isCompleted: boolean;
      }

      const initialCheckedStates: CheckedStates = storedTasks.reduce((acc: CheckedStates, task: Task) => {
        acc[`${task.id}-main`] = task.isCompleted || false;
        return acc;
      }, {});
      setCheckedStates(initialCheckedStates);
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

  const handleCheckbox =async (taskId: string, subtaskIndex?: number) => {
    const key =
      subtaskIndex !== undefined
        ? `${taskId}-${subtaskIndex}`
        : `${taskId}-main`;

    setCheckedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    try {
      const newStatus = !checkedStates[key];
      const updatedTasks = await updateTaskCompletionStatus(taskId, newStatus);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  


  const [incompleteTasks, setIncompleteTasks] = useState<Tasks[]>([]);
  const [completeTasks, setCompleteTasks] = useState<Tasks[]>([]);
  const [showComplete, setShowComplete] = useState(false);

  // useEffect(() => {
  //   const incomplete = tasks.filter((task) => {
  //     const isChecked = checkedStates[`${task.id}-main`];
  //     return !isChecked;
  //   });
  //   const complete = tasks.filter((task) => {
  //     const isChecked = checkedStates[`${task.id}-main`];
  //     return isChecked;
  //   });
  //   setIncompleteTasks(incomplete);
  //   setCompleteTasks(complete);
  // }, [tasks, checkedStates]);
  useEffect(() => {
    const incomplete = tasks.filter((task) => !task.isCompleted);
    const complete = tasks.filter((task) => task.isCompleted);
    setIncompleteTasks(incomplete);
    setCompleteTasks(complete);
  }, [tasks]);
  return (
    <View
      style={[, { backgroundColor: colors.PRIMARY_BG }]}
      className="h-full p-6 w-full  "
    >
      <Text
        style={{
          fontFamily: "Geist-SemiBold",
          color: colors.PRIMARY_TEXT,
        }}
        className=" text-xl font-geist mb-10 "
      >
        Task
      </Text>

     <View className="flex flex-col gap-4">
     <ScrollView className="">
        <View className="flex flex-col gap-2">
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <TouchableOpacity
                onPress={() => handleCheckbox(task.id)}
                key={task.id}
                style={{ backgroundColor: colors.LIGHT_BG }}
                className="px-4 py-[18]  rounded-lg  flex  items-center flex-row gap-4"
              >
                <Checkbox
                  style={{ width: 14, height: 14 }}
                  color={colors.PRIMARY_TEXT + 95}
                  value={checkedStates[`${task.id}-main`] || false}
                  onValueChange={() => handleCheckbox(task.id)}
                />
                <Text
                  className="text-[14px]"
                  style={{
                    color: colors.PRIMARY_TEXT,
                    fontFamily: "Geist-Medium",
                    textDecorationLine: checkedStates[`${task.id}-main`]
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </Text>
                {/* <View className="flex flex-row gap-5 ">
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
                  </View> */}
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                color: colors.CTA,
                fontFamily: "Geist-Bold",
                fontSize: 16,
              }}
              className="text-center mt-4"
            >
              No Task Found
            </Text>
          )}
        </View>
      </ScrollView>

      <ScrollView className="">
        <Button
          onPress={() => setShowComplete(!showComplete)}
          className="flex flex-row items-center  "
          icon={"chevron-down"}
        >
          Completed
          {/* <Ionicons
              name="chevron-down"
              className="inline mt-6"
              size={18}
              color={colors.PRIMARY_TEXT}
            /> */}
        </Button>
        {showComplete && (
          <View className="flex-col gap-2">
            {completeTasks.length > 0 ? (
              completeTasks.map((task) => (
                <TouchableOpacity
                  onPress={() => handleCheckbox(task.id)}
                  key={task.id}
                  style={{ backgroundColor: colors.LIGHT_BG }}
                  className="px-4 py-[18]  rounded-lg  flex  items-center flex-row gap-4"
                >
                  <Checkbox
                    style={{ width: 14, height: 14 }}
                    color={colors.PRIMARY_TEXT + 95}
                    value={checkedStates[`${task.id}-main`] || false}
                    onValueChange={() => handleCheckbox(task.id)}
                  />
                  <Text
                    className="text-[14px]"
                    style={{
                      color: colors.PRIMARY_TEXT,
                      fontFamily: "Geist-Medium",
                      textDecorationLine: checkedStates[`${task.id}-main`]
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </Text>
                  {/* <View className="flex flex-row gap-5 ">
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
                  </View> */}
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: colors.CTA,
                  fontFamily: "Geist-Bold",
                  fontSize: 16,
                }}
                className="text-center mt-4"
              >
                No complete Tasks Found
              </Text>
            )}
          </View>
        )}
      </ScrollView>
     </View>

      {/*Route: For Creating new task  */}

      <Link
        href={"/(screens)/newtask"}
        className="absolute bottom-8 right-8 m-2  "
      >
        <View
          style={{ backgroundColor: colors.PRIMARY_TEXT }}
          className="p-3 rounded-full"
        >
          <Ionicons name="add-outline" size={28} color={colors.PRIMARY_BG} />
        </View>
      </Link>
    </View>
  );
};

export default Task;
