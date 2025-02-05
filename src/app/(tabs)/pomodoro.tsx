import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  TextInput 
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Pomodoro = () => {
  const [duration, setDuration] = useState(30 * 60); // Default 30 minutes
  const [breakDuration] = useState(5 * 60); // 5 minute break
  const [isBreak, setIsBreak] = useState(false);
  const [state, setState] = useState<"initial" | "running" | "paused">("initial");
  const [timer, setTimer] = useState(duration);
  const [showModal, setShowModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [editMinutes, setEditMinutes] = useState('30');
  const [editSeconds, setEditSeconds] = useState('0');

  useEffect(() => {
    if (state === "running") {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(id);
            setState("initial");
            if (!isBreak) {
              // Work session completed, show break choice modal
              setShowBreakModal(true);
            } else {
              // Break completed, reset to work session
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
  }, [state, isBreak, duration]);

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
    <View className="bg-[#18181B] h-full w-full p-7">
      <Text style={{fontFamily:"Geist-SemiBold"}} className="text-[25px] text-white text-center">
        {isBreak ? "Break Time" : "Pomodoro"}
      </Text>
      
      {/* Edit Duration Button - only show during work session */}
      {!isBreak && (
        <TouchableOpacity 
          onPress={() => setShowModal(true)}
          className="absolute right-5 top-9"
        >
          <FontAwesome5 name="edit" size={19} color="#fff" />
        </TouchableOpacity>
      )}
      
      <View className="flex flex-col gap-5 items-center justify-center h-[550px]">
        <View className="flex flex-col items-center">
          <Text
            style={{ fontFamily: "Geist-Regular" }}
            className="text-[16px] text-white"
          >
            {isBreak ? "taking a break from" : "working on"}
          </Text>
          <Text
            style={{ fontFamily: "Geist-SemiBold" }}
            className="text-[18px] text-[#D62059]"
          >
            UnicornSpace UI
          </Text>
        </View>
        <View className={`w-[250px] h-[250px] border-8 flex items-center justify-center rounded-full ${isBreak ? 'border-green-500' : 'border-white'}`}>
          <Text style={{fontFamily:"Geist-SemiBold"}} className="text-[55px] text-[#fff]">
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
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, isBreak && styles.breakButton]}
                onPress={handleStop}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.button, isBreak && styles.breakButton]} 
              onPress={handleMainAction}
            >
              <Text style={styles.buttonText}>
                {state === "initial" ? "Play" : "Pause"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Duration Configuration Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#000000] p-5 rounded-lg w-[300px]">
            <Text style={{fontFamily:"Geist-SemiBold"}} className="text-center text-lg mb-4 text-white">Set Timer Duration</Text>
            <View className="flex-row justify-between mb-4">
              <View className="flex flex-col gap-2">
                <Text style={{fontFamily:"Geist-Regular"}} className="text-white">Minutes</Text>
                <TextInput
                  value={editMinutes}
                  onChangeText={setEditMinutes}
                  keyboardType="numeric"
                  style={{fontFamily:"Geist-Regular"}} 
                  className="border-white border p-2 w-[100px] text-white rounded-md"
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text style={{fontFamily:"Geist-Regular"}} className="text-white">Seconds</Text>
                <TextInput
                  style={{fontFamily:"Geist-Regular"}} 
                  value={editSeconds}
                  onChangeText={setEditSeconds}
                  keyboardType="numeric"
                  className="border-white border p-2 w-[100px] text-white rounded-md"
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity 
                onPress={() => setShowModal(false)}
                className="bg-[#D62059] p-3 rounded-[7px]"
              >
                <Text style={{fontFamily:"Geist-SemiBold"}} className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleSaveDuration}
                className="bg-[#D62059] p-3 rounded-[7px]"
              >
                <Text style={{fontFamily:"Geist-SemiBold"}} className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Break Choice Modal */}
      <Modal
        visible={showBreakModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#000000] p-5 rounded-lg w-[300px]">
            <Text style={{fontFamily:"Geist-SemiBold"}} className="text-center text-lg mb-4 text-white">
              Time for a Break!
            </Text>
            <Text style={{fontFamily:"Geist-Regular"}} className="text-center text-white mb-4">
              Would you like to take a 5-minute break?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity 
                onPress={handleSkipBreak}
                className="bg-[#D62059] p-3 rounded-[7px]"
              >
                <Text style={{fontFamily:"Geist-SemiBold"}} className="text-white">Skip Break</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleStartBreak}
                className="bg-green-500 p-3 rounded-[7px]"
              >
                <Text style={{fontFamily:"Geist-SemiBold"}} className="text-white">Start Break</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#D62059",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  breakButton: {
    backgroundColor: "#22C55E", // Green color for break mode
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Pomodoro;