import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import colors from "../../utils/colors";
import { Achievement } from "../../utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
const BottomSheetAchievment = () => {
  const [achievementName, setAchievementName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  return (
    <View className="flex flex-col justify-between gap-10 ">
      <Text
        style={{
          fontFamily: "Geist-SemiBold",
          color: colors.PRIMARY_TEXT,
        }}
        className="text-[18px]"
      >
        Create Achievement
      </Text>
      <View className="flex flex-col gap-8">
        <BottomSheetTextInput
        autoFocus
          placeholderTextColor={colors.PRIMARY_TEXT +80}
          className="border border-white  rounded-[5px] text-white pl-3 bg-LIGHT_BG"
          placeholder="Unlock a new achievement—give it a name!"
        />
        <BottomSheetTextInput
          placeholderTextColor={colors.PRIMARY_TEXT + 80}
          className="border border-white  rounded-[5px] text-white pl-3 bg-LIGHT_BG pb-20"
          placeholder="Describe your achievement.."
        />
      </View>
      <Button
        labelStyle={{ color: colors.PRIMARY_BG, fontFamily: "Geist-Bold" }}
        mode="contained"
        style={styles.submitButton}
      >
        Celebrate Achievement
      </Button>
    </View>
  );
};

export default BottomSheetAchievment;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,
    marginBottom: 20,
  },
});
