import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button } from "react-native-paper";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  getTasks,
  deleteTask,
  Tasks,
  updateTaskCompletionStatus,
} from "../../../utils/storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import colors from "../../../utils/colors";
import BottomDrawer from "../../componets/BottomDrawer";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
// import { styles } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";

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

      const initialCheckedStates: CheckedStates = storedTasks.reduce(
        (acc: CheckedStates, task: Task) => {
          acc[`${task.id}-main`] = task.isCompleted || false;
          return acc;
        },
        {}
      );
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

  const handleCheckbox = async (taskId: string, subtaskIndex?: number) => {
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

  useEffect(() => {
    const incomplete = tasks.filter((task) => !task.isCompleted);
    const complete = tasks.filter((task) => task.isCompleted);
    setIncompleteTasks(incomplete);
    setCompleteTasks(complete);
  }, [tasks]);

  // State that manages the visibility of the bottom drawer
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClose = useCallback((event: GestureResponderEvent) => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <Pressable
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

      <Pressable
       onPress={handlePresentModalPress}
        className="absolute bottom-8 right-8 m-2  "
      >
        <View
          style={{ backgroundColor: colors.PRIMARY_TEXT }}
          className="p-3 rounded-full"
        >
          <Ionicons name="add-outline" size={28} color={colors.PRIMARY_BG} />
        </View>
      </Pressable>
      {/* <BottomDrawer/> */}
      <Pressable>
    
      <BottomSheetModal
        
        // index={0}
        // snapPoints={["55%"]}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ height:0, }}
        handleStyle={{ backgroundColor:colors.PRIMARY_BG,}}
        enableOverDrag={false}
        enablePanDownToClose={false}
        android_keyboardInputMode="adjustResize"
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={() => (
          <Pressable
            onPress={handleClose}
            className="absolute h-full w-[400px] bg-black/80 top-0"
          ></Pressable>
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomDrawer/>
        </BottomSheetView>
      </BottomSheetModal>
      
      </Pressable>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:25,
    // padding: 24,
    justifyContent: "center",
    backgroundColor:colors.PRIMARY_BG,
  },
  contentContainer: {
    // flex: 1,
    // alignItems: "flex-start",
    paddingHorizontal:25,
    backgroundColor:colors.PRIMARY_BG,
    height: 350,
  },
});
export default Task;
