import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";


interface Props {

  title:string;
  icon1:string;
  icon2:string;
}

const HeaderBar = ({title,icon1,icon2}:Props) => {
  return (
    <View>
      <Appbar.Header style={{backgroundColor: "#18181B" ,height:60,marginBottom:5,}}>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        
       <View  className="flex-row items-center justify-between w-full p-2">
       <Text style={{fontFamily:'Poppins-SemiBold'}} className="text-white text-[20px]  ">{title}</Text>
        <View className=" flex-row items-center justify-center">
        <Appbar.Action icon={icon1} onPress={() => {}} size={22} />
        <Appbar.Action icon={icon2} onPress={() => {}} size={22} />
        </View>
       </View>
      </Appbar.Header>
       
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({});
