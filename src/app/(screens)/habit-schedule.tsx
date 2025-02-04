import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Checkbox, TextInput } from "react-native-paper";
import colors from "../../../utils/colors";

const HabitSchedule = () => {


  const handleSubmitHabit = () => {};
  return (
    <SafeAreaView style={styles.safeArea}>
     
    </SafeAreaView>
  );
};

export default HabitSchedule;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
  },
 
 
  submitButton: {
    // marginTop: 20,
    backgroundColor: "#D62059",
    borderRadius: 7,
  },
});
