import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { v4 as uuidv4 } from 'uuid';
import colors from "../../../utils/colors";
import { saveAchievements, getAchievements } from "../../../utils/storage";

const NewAchievement = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [achievementName, setAchievementName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchAchievement = async () => {
      if (id) {
        const existingAchievements = await getAchievements();
        const achievement = existingAchievements.find((a) => a.id === id);
        if (achievement) {
          setAchievementName(achievement.title);
          setDescription(achievement.description || "");
        }
      }
    };
    fetchAchievement();
  }, [id]);

  const handleSubmitAchievement = async () => {
    if (achievementName.trim() === "") {
      setErrors("Please enter an achievement name");
      return;
    }

    setErrors("");

    try {
      const newAchievement = {
        id: typeof id === "string" ? id : uuidv4(),
        title: achievementName,
        description,
      };

      await saveAchievements(newAchievement);
      router.push("/achievements");
    } catch (error) {
      Alert.alert("Error", "Failed to save achievement");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.PRIMARY_BG }}>
      <View className="h-full w-full px-6 py-8 flex flex-col justify-between">
        <View className="flex flex-col gap-8">
          <Text
            style={{ 
              fontFamily: "Geist-SemiBold", 
              color: colors.PRIMARY_TEXT 
            }}
            className="text-[22px]"
          >
            {id ? "Edit Achievement" : "Create Achievement"}
          </Text>

          <View className="flex flex-col gap-5">
            <View>
              <TextInput
                mode="outlined"
                style={{
                  backgroundColor: colors.LIGHT_BG,
                  fontFamily: "Geist-Regular",
                  color: colors.PRIMARY_TEXT,
                }}
                cursorColor="#666666"
                outlineColor={colors.PRIMARY_BG}
                activeOutlineColor={colors.CTA}
                label="Achievement Name"
                value={achievementName}
                onChangeText={setAchievementName}
              />
              {errors && <Text className="text-red-500">{errors}</Text>}
            </View>
            <TextInput
              mode="outlined"
              style={{
                backgroundColor: colors.LIGHT_BG,
                fontFamily: "Geist-Regular",
                color: colors.PRIMARY_TEXT,
                paddingBottom: 35,
              }}
              cursorColor="#666666"
              outlineColor={colors.PRIMARY_BG}
              activeOutlineColor={colors.CTA}
              label="Achievement Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmitAchievement}
          style={styles.submitButton}
          labelStyle={{
            color: colors.PRIMARY_BG,
            fontFamily: "Geist-Bold",
          }}
        >
          {id ? "Update Achievement" : "Celebrate your Achievement"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NewAchievement;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,
  },
});