import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const newcategory = () => {
  return (
    <View className="bg-[#18181B] h-full w-full p-7">
      <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-white text-[18px] mb-7">
      How do you want to evaluate your progress ?
      </Text>
      <View className="flex flex-col gap-7">
        <View className="flex flex-col gap-1">
          <Button style={{borderRadius:7}} mode="contained-tonal" buttonColor="#D62059" labelStyle={{fontFamily:"Poppins-SemiBold"}}>WITH A YES OR NO</Button>
          <Text style={{fontFamily:"Poppins-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to record whether you succeed with the activity or
            not.
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Poppins-SemiBold"}} mode="contained-tonal">With a NUMERIC value</Button>
          <Text style={{fontFamily:"Poppins-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to establish a daily goal or a limit for the habit
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Poppins-SemiBold"}} mode="contained-tonal">With a CHECKLIST</Button>
          <Text style={{fontFamily:"Poppins-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to evaluate your activity based on a set of sub
            items
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <Button style={{borderRadius:7}} buttonColor="#D62059" labelStyle={{fontFamily:"Poppins-SemiBold"}} mode="contained-tonal">With a TIMER</Button>
          <Text style={{fontFamily:"Poppins-Regular",textAlign:"center"}} className="text-[#666666] text-[12px]">
            If you just want to evaluate your activity based on how much time
            you spent doing it.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default newcategory;

const styles = StyleSheet.create({});
