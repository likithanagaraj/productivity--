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
import { getTasks, deleteTask } from "../../../utils/storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import colors from "../../../utils/colors";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface Tasks {
  id: string;
  title: string;
  subtasks: string[];
}

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

  const handleCheckbox = (taskId: string, subtaskIndex?: number) => {
    const key =
      subtaskIndex !== undefined
        ? `${taskId}-${subtaskIndex}`
        : `${taskId}-main`;

    setCheckedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const drag = Gesture.Pan().onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View
      style={[, { backgroundColor: colors.PRIMARY_BG }]}
      className="h-full w-full  "
    >
      <View className="p-6 h-full ">
        <Text
          style={{ fontFamily: "Geist-SemiBold", marginBottom: 20,color:colors.PRIMARY_TEXT }}
          className=" text-3xl  "
        >
          Task
        </Text>

        <ScrollView className="mb-5">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <View
                key={task.id}
                style={{backgroundColor:colors.LIGHT_BG}}
                className="p-4  rounded-lg mb-3 flex justify-between items-center flex-row gap-2"
              >
                <View className="flex flex-col gap-3">
                  {task.subtasks.length === 0 && (
                    <View className="flex flex-row gap-3 items-center">
                      <Checkbox
                        style={{ width: 18, height: 18 }}
                        color={colors.PRIMARY_TEXT + 95}
                        value={checkedStates[`${task.id}-main`] || false}
                        onValueChange={() => handleCheckbox(task.id)}
                      />
                      <Text
                      style={{ fontFamily: "Geist-Regular" }}
                        className={
                          checkedStates[`${task.id}-main`]
                            ? "text-white line-through text-lg font-bold"
                            : "text-white text-lg font-bold"
                        }
                      >
                        {task.title}
                      </Text>
                    </View>
                  )}

                  {task.subtasks.length > 0 && (
                    <>
                      <Text style={{color:colors.PRIMARY_TEXT,fontFamily:"Geist-Medium"}} className=" text-[18px] ">
                        {task.title}
                      </Text>
                      {task.subtasks.map((sub: string, index: number) => {
                        const checkboxKey = `${task.id}-${index}`;
                        return (
                          <View
                            style={[containerStyle]}
                            key={index}
                            className="flex flex-row gap-3 items-center ml-6"
                          >
                            <Checkbox
                              style={{ width: 18, height: 18 }}
                              value={checkedStates[checkboxKey] || false}
                        color={colors.PRIMARY_TEXT + 95}

                              onValueChange={() =>
                                handleCheckbox(task.id, index)
                              }
                            />
                            <Text
                            style={{fontFamily:"Geist-Regular",color:colors.PRIMARY_TEXT + 95}}
                              className={
                                checkedStates[checkboxKey]
                                  ? "text-white line-through"
                                  : "text-white"
                              }
                            > 
                              {sub}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  )}
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

        <Link
          href={"/(screens)/newtask"}
          className="absolute bottom-8 right-8 m-2  "
        >
          <View style={{backgroundColor:colors.PRIMARY_TEXT}} className="p-3 rounded-full">
            <Ionicons name="add-outline" size={28} color={colors.PRIMARY_BG} />
          </View>
        </Link>
        {/* <Link href={"/(screens)/newtask"}>
          <Button
            labelStyle={{ fontFamily: "Poppins-SemiBold" }}
            style={{ width: 200 }}
            mode="contained-tonal"
            textColor="white"
            buttonColor="#D62059"
          >
            Create new Task
          </Button>
        </Link> */}
      </View>
    </View>
  );
};

export default Task;
