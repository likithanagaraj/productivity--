import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const newhabitOptions = () => {
  return (
    <View className="bg-[#18181B] h-full w-full p-7">
      <Text style={{fontFamily:"Geist-SemiBold"}} className="text-white text-[18px] mb-7 text-center">
      How do you want to track your habits ?
      </Text>
      <View className="flex flex-col gap-7">
        <View className="flex flex-col gap-1">
          <Button onPress={()=> router.push("/boolean-category")} style={{borderRadius:7}} mode="contained-tonal" buttonColor="#D62059" labelStyle={{fontFamily:"Geist-SemiBold"}}>WITH A YES OR NO</Button>
          <Text style={{fontFamily:"Geist-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to record whether you succeed with the activity or
            not.
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button onPress={()=> router.push("/numeric-category")} style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Geist-SemiBold"}} mode="contained-tonal">With a NUMERIC value</Button >
          <Text style={{fontFamily:"Geist-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to establish a daily goal or a limit for the habit
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button onPress={()=> router.push("/checklist-category")} style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Geist-SemiBold"}} mode="contained-tonal">With a CHECKLIST</Button>
          <Text style={{fontFamily:"Geist-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to evaluate your activity based on a set of sub
            items
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Geist-SemiBold"}} mode="contained-tonal">With a TIMER</Button>
          <Text style={{fontFamily:"Geist-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to evaluate your activity based on how much time
            you spent doing it.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default newhabitOptions;

const styles = StyleSheet.create({});
