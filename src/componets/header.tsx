import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import colors from "../../utils/colors";


interface Props {

  title:string;
  icon1:string;
  icon2:string;
}

const HeaderBar = ({title,icon1,icon2}:Props) => {
  return (
    <View>
      <Appbar.Header style={{backgroundColor: colors.PRIMARY_BG  ,height:60,marginBottom:5,}}>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        
       <View  className="flex-row items-center justify-between w-full p-2">
       <Text style={{fontFamily:'Geist-SemiBold'}} className="text-white text-[18px]  ">{title}</Text>
        <View className=" flex-row items-center justify-center">
        <Appbar.Action iconColor={colors.PRIMARY_TEXT} icon={icon1} onPress={() => {}} size={20} />
        <Appbar.Action iconColor={colors.PRIMARY_TEXT} icon={icon2} onPress={() => {}} size={20} />
        </View>
       </View>
      </Appbar.Header>
       
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({});
