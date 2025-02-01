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
  const [state, setState] = useState<"initial" | "running" | "paused">("initial");
  const [timer, setTimer] = useState(duration);
  const [showModal, setShowModal] = useState(false);
  const [editMinutes, setEditMinutes] = useState('30');
  const [editSeconds, setEditSeconds] = useState('0');

  useEffect(() => {
    if (state === "running") {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(id);
            setState("initial");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [state]);

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
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View className="bg-[#18181B] h-full w-full p-7">
      <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-[25px] text-white text-center">Pomodoro</Text>
      
      {/* Edit Duration Button */}
      <TouchableOpacity 
        onPress={() => setShowModal(true)}
        className="absolute right-5 top-9"
      >
        <FontAwesome5  name="edit" size={19} color="#fff" />
      </TouchableOpacity>
      
      <View className="flex flex-col gap-5 items-center justify-center h-[550px]">
      <View className="flex flex-col items-center">
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-[16px] text-white"
          >
            working on
          </Text>
          <Text
            style={{ fontFamily: "Poppins-SemiBold" }}
            className="text-[18px] text-[#D62059]"
          >
            UnicornSpace UI
          </Text>
        </View>
        <View className="w-[250px] h-[250px] border-white border-8 flex items-center justify-center rounded-full">
          <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-[55px] text-[#fff]">
            {formatTime(timer)}
          </Text>
        </View>
        
        <View style={styles.container}>
          {state === "paused" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setState("running")}
              >
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleStop}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleMainAction}>
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
            <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-center text-lg mb-4 text-white ">Set Timer Duration</Text>
            <View className="flex-row justify-between mb-4">
              <View className="flex flex-col gap-2">
                <Text style={{fontFamily:"Poppins-Regular"}} className="text-white">Minutes</Text>
                <TextInput
                  value={editMinutes}
                  onChangeText={setEditMinutes}
                  keyboardType="numeric"
                  style={{fontFamily:"Poppins-Regular"}} 
                  className="border-white border p-2 w-[100px] text-white rounded-md"
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text style={{fontFamily:"Poppins-Regular"}}  className="text-white">Seconds</Text>
                <TextInput
                style={{fontFamily:"Poppins-Regular"}} 
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
                <Text style={{fontFamily:"Poppins-SemiBold"}}  className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleSaveDuration}
                className="bg-[#D62059] p-3 rounded-[7px]"
              >
                <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-white">Save</Text>
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