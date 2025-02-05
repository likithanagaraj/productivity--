import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";

const TimerScreen = () => {
  const [count, setcount] = useState(`${1}:00`);
  const startcount = ()=>{
    const timeInterval = setInterval(() => {
      setcount((prev) => {
        const min = parseInt(prev.split(":")[0]);
        const sec = parseInt(prev.split(":")[1]);
        if (min === 0 && sec === 0) {
          clearInterval(timeInterval);
          return "00:00";
        } else if (sec === 0) {
          return `${min - 1}:59`;
        } else {
          return `${min}:${sec - 1}`;
        }
      });
    }, 1000);
    
  }

  const restart = () => {
    setcount((prev) => {
      return `${1}:00`;
    });
  }
  return (
    <SafeAreaView>
      <View className="flex-col  items-center justify-center h-full gap-5 ">
        <View className="h-[200px] w-[200px] rounded-full bg-transparent flex justify-center items-center border-[5px] border-white ">
          <Text
            style={{ fontFamily: "Geist-SemiBold" }}
            className="text-white text-[40px] "
          >
            {count}
          </Text>
        </View>
        <View className="flex-row gap-5">
          <Button

            mode="contained-tonal"
            buttonColor="#D62059"
            textColor="#fff"
            labelStyle={{ fontFamily: "Geist-SemiBold", fontSize: 15 }}
            style={{ borderRadius: 18,  }}
            onPress={startcount}
          >
            Start
          </Button>
          <Button
            mode="contained-tonal"
            buttonColor="#D62059"
            textColor="#fff"
            labelStyle={{ fontFamily: "Geist-SemiBold", fontSize: 15 }}
            style={{ borderRadius: 18,  }}
            onPress={restart}
          >
            Restart
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({});
