import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../../utils/colors";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { PomodoroStorage } from "../../../utils/storage";
export const POMODORO_STORAGE_KEY = "POMODORO";

const Pomodoro = () => {
  const [duration, setDuration] = useState(30 * 60); // Default 30 minutes
  const [breakDuration] = useState(5 * 60); // 5 minute break
  const [isBreak, setIsBreak] = useState(false);
  const [state, setState] = useState<"initial" | "running" | "paused">(
    "initial"
  );
  const [timer, setTimer] = useState(duration);
  const [showModal, setShowModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [editMinutes, setEditMinutes] = useState("30");
  const [editSeconds, setEditSeconds] = useState("0");
  const [totalWorkTime, setTotalWorkTime] = useState(0); // in seconds

  // useEffect(() => {
  //   if (state === "running") {
  //     const id = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         if (prevTimer <= 0) {
  //           clearInterval(id);
  //           setState("initial");
  //           if (!isBreak) {
  //             setShowBreakModal(true);
  //           } else {
  //             setIsBreak(false);
  //             setTimer(duration);
  //           }
  //           return 0;
  //         }
  //         return prevTimer - 1;
  //       });
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }
  // }, [state, isBreak, duration]);

  const handleStartBreak = () => {
    setIsBreak(true);
    setTimer(breakDuration);
    setState("initial");
    setShowBreakModal(false);
  };

  const handleSkipBreak = () => {
    setIsBreak(false);
    setTimer(duration);
    setState("initial");
    setShowBreakModal(false);
  };
  const formatTotalTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h  ${minutes}m`;
    }
    return `${minutes} m`;
  };

  // useEffect(() => {
  //   if (state === "running") {
  //     const id = setInterval(() => {
  //       setTimer((prevTimer) => {
  //         if (prevTimer <= 0) {
  //           clearInterval(id);
  //           setState("initial");
  //           if (!isBreak) {
  //             const newTotalTime = totalWorkTime + duration;
  //             setTotalWorkTime(newTotalTime);
  //             setShowBreakModal(true);
  //           } else {
  //             setIsBreak(false);
  //             setTimer(duration);
  //           }
  //           return 0;
  //         }
  //         return prevTimer - 1;
  //       });
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }
  // }, [state, isBreak, duration, totalWorkTime]);
  // useEffect(() => {
  //   const loadSavedTime = async () => {
  //     try {
  //       const savedTime = await AsyncStorage.getItem(POMODORO_STORAGE_KEY);
  //       if (savedTime !== null) {
  //         setTotalWorkTime(JSON.parse(savedTime));
  //       }
  //     } catch (error) {
  //       console.error('Error loading saved time:', error);
  //     }
  //   };
  //   loadSavedTime();

  // }, []);
  // useEffect(() => {
  //   const saveTime = async () => {
  //     try {
  //       await AsyncStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(totalWorkTime));
  //     } catch (error) {
  //       console.error('Error saving time:', error);
  //     }
  //   };
  //   saveTime();
  // }, [totalWorkTime]);

  useEffect(() => {
    const loadSavedTime = async () => {
      const savedTime = await PomodoroStorage.loadTime();
      setTotalWorkTime(savedTime);
    };
    loadSavedTime();
  }, []);

  // Save time whenever it changes
  useEffect(() => {
    PomodoroStorage.saveTime(totalWorkTime);
  }, [totalWorkTime]);

  useEffect(() => {
    if (state === "running") {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(id);
            setState("initial");
            if (!isBreak) {
              const newTotalTime = totalWorkTime + duration;
              setTotalWorkTime(newTotalTime);
              setShowBreakModal(true);
            } else {
              setIsBreak(false);
              setTimer(duration);
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [state, isBreak, duration, totalWorkTime]);

  const handleMainAction = () => {
    switch (state) {
      case "initial":
        setState("running");
        break;
      case "running":
        setState("paused");
        break;
      case "paused":
        setState("running");
        break;
    }
  };

  const handleStop = () => {
    if (!isBreak && state === "running") {
      const timeSpent = duration - timer;
      const newTotalTime = totalWorkTime + timeSpent;
      setTotalWorkTime(newTotalTime);
    }
    setTimer(duration);
    setState("initial");
    setIsBreak(false);
  };

  const handleSaveDuration = () => {
    const mins = parseInt(editMinutes);
    const secs = parseInt(editSeconds);

    // Basic validation
    if (!isNaN(mins) && !isNaN(secs)) {
      const newDuration = mins * 60 + secs;
      setDuration(newDuration);
      setTimer(newDuration);
      setShowModal(false);
      setState("initial");
      setIsBreak(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View
    
      className=" h-full w-full p-6 bg-PRIMARY_BG"
    >
      <Text
        
        className="text-[18px] text-white Geist-SemiBold"
      >
        {isBreak ? "Break Time" : "Pomodoro"}
      </Text>

      {/* Edit Duration Button - hide only when timer is running */}
      {!isBreak && state !== "running" && (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="absolute right-5 top-5"
        >
          <Button>
            <FontAwesome5 name="edit" size={16} color="#fff" />
          </Button>
        </TouchableOpacity>
      )}

      <View className="flex flex-col gap-5 items-center justify-center h-[550px]">
        
        <View
          className={`w-[250px] h-[250px] border-4 flex items-center justify-center rounded-full ${
            isBreak ? "border-[#fff]" : "border-white"
          }`}
        >
          <Text
          
            className="text-[55px] text-[#fff] font-GeistSemiBold"
          >
            {formatTime(timer)}
          </Text>
        </View>

        <View style={styles.container}>
          {state === "paused" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, isBreak && styles.breakButton]}
                onPress={() => setState("running")}
              >
                <Text className="font-bold text-PRIMARY_BG text-lg ">Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, isBreak && styles.breakButton]}
                onPress={handleStop}
              >
                <Text className="font-bold text-PRIMARY_BG text-lg ">Stop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, isBreak && styles.breakButton]}
              onPress={handleMainAction}
            >
              <Text  className="font-bold text-PRIMARY_BG text-lg ">
                {state === "initial" ? "Play" : "Pause"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Duration Configuration Modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            style={{ backgroundColor: colors.PRIMARY_BG }}
            className=" p-5 rounded-lg w-[300px]"
          >
            <Text
           
              className="text-center text-lg mb-4 text-white font-GeistSemiBold"
            >
              Set Timer Duration
            </Text>
            <View className="flex-row justify-between mb-4">
              <View className="flex flex-col gap-2">
                <Text
                 
                  className="text-white font-geistRegular"
                >
                  Minutes
                </Text>
                <TextInput
                  value={editMinutes}
                  onChangeText={setEditMinutes}
                  keyboardType="numeric"
                  style={{
                    
                    backgroundColor: colors.LIGHT_BG,
                  }}
                  className="border-white border p-2 w-[100px] text-white rounded-md font-geistRegular"
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text
                 
                  className="text-white font-geistRegular"
                >
                  Seconds
                </Text>
                <TextInput
                
                  value={editSeconds}
                  onChangeText={setEditSeconds}
                  keyboardType="numeric"
                  className="border-white border p-2 w-[100px] text-white rounded-md font-geistRegular bg-LIGHT_BG"
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className=" p-3 rounded-[7px]"
                style={{ backgroundColor: colors.CTA }}
              >
                <Text
                  style={{
                    fontFamily: "Geist-SemiBold",
                    color: colors.PRIMARY_BG,
                  }}
                  className=""
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveDuration}
                style={{ backgroundColor: colors.CTA }}
                className=" p-3 rounded-[7px]"
              >
                <Text
                  style={{
                    fontFamily: "Geist-SemiBold",
                    color: colors.PRIMARY_BG,
                  }}
                  className=""
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Break Choice Modal */}
      <Modal visible={showBreakModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            style={{ backgroundColor: colors.LIGHT_BG }}
            className=" p-5 rounded-lg w-[300px]"
          >
            <Text
              
              className="text-center text-lg mb-4 text-white font-semibold"
            >
              Time for a Break!
            </Text>
            <Text
              
              className="text-center text-white mb-4 font-geistRegular"
            >
              Would you like to take a 5-minute break?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={handleSkipBreak}
                style={{ backgroundColor: colors.CTA }}
                className=" p-3 rounded-[7px]"
              >
                <Text
                  
                  className="font-GeistSemiBold text-PRIMARY_BG"
                >
                  Skip Break
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleStartBreak}
                style={{ backgroundColor: colors.CTA }}
                className=" p-3 rounded-[7px]"
              >
                <Text
                  
                  className="font-GeistSemiBold text-PRIMARY_BG"
                >
                  Start Break
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="flex flex-col items-center mt-4">
        <Text
          
          className="text-[14px] text-white opacity-70 font-geistRegular"
        >
          Total Focus Time
        </Text>
        <Text
         
          className="text-[16px] text-white font-semibold"
        >
          {formatTime(totalWorkTime)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.CTA,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  breakButton: {
    backgroundColor: colors.CTA, // Green color for break mode
  },
  buttonText: {
    color: colors.PRIMARY_BG,
    fontFamily: "Geist-SemiBold",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Pomodoro;
