import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import colors from "../../../utils/colors";
import { getAchievements } from "../../../utils/storage";

const Achievements = () => {
  interface Achievement {
    id: string;
    title: string;
    description?: string;
  }
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const fetchAchievements = async () => {
    try {
      const fetchedAchievements = await getAchievements();
      setAchievements(fetchedAchievements);
    } catch (error) {
      console.error("Error in fetchAchievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const renderAchievement = ({ item }:any) => (
   <View style={styles.achievementItem}>
     <FontAwesome5 name="medal" size={24} color={colors.PRIMARY_TEXT} />
    <View  className="flex flex-col ">
      <Text style={styles.achievementTitle}>{item.title}</Text>
      <Text style={styles.achievementDescription}>{item.description}</Text>
    </View>
   </View>
  );

  return (
    <View
      style={{ backgroundColor: colors.PRIMARY_BG }}
      className="h-full w-full p-8 flex flex-col items-center gap-10"
    >
      <Text
        style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
        className="text-3xl"
      >
        Achievements
      </Text>
      <Ionicons name="trophy" size={100} color={colors.PRIMARY_TEXT} />
      {achievements.length > 0 ? (
        <FlatList
          data={achievements}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={renderAchievement}
          keyExtractor={(item) => item.id}
          style={styles.achievementsList}
        />
      ) : (
        <Text style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
        className="text-3xl" >Add and Celebrate Your Achievements</Text>
      )}

      <Link
        href={"/new-achievements"}
        className="absolute bottom-8 right-8 m-2"
      >
        <View
          style={{ backgroundColor: colors.PRIMARY_TEXT }}
          className="p-3 rounded-full"
        >
          <Ionicons name="add" size={28} color={colors.PRIMARY_BG} />
        </View>
      </Link>
    </View>
  );
};

export default Achievements;

const styles = StyleSheet.create({
  achievementItem: {
    backgroundColor: colors.LIGHT_BG,
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    width: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
   
    // justifyContent: "space-between",
  },
  achievementTitle: {
    fontFamily: "Geist-SemiBold",
    fontSize: 16,
    color: colors.PRIMARY_TEXT,
  },
  achievementDescription: {
    fontFamily: "Geist-Medium",
    color: colors.PRIMARY_TEXT + 90,
    marginTop: 5,
  },
  achievementsList: {
    width: '100%',
  },
});