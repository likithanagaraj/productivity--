import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
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
const editEnable = (id: string) => {
  router.push({
    pathname: "/new-achievements",
    params: { id }
  });
}
  const renderAchievement = ({ item }: any) => (
    <TouchableOpacity onPress={() => editEnable(item.id)} style={styles.achievementItem} >
        <Text className="text-4xl
        ">🎖️</Text>
      {/* <FontAwesome5 name="medal" size={24} color={colors.PRIMARY_TEXT} /> */}
      <View className="flex flex-col -mt-2">
        <Text style={styles.achievementTitle}>{item.title}</Text>
        {/* <Text style={styles.achievementDescription}>{item.description}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{ backgroundColor: colors.PRIMARY_BG }}
      className="h-full w-full p-6 flex flex-col  gap-8"
    >
      <Text
        style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
        className="text-[18px]"
      >
        Achievements
      </Text>
      <View className="flex items-center justify-center">

      <Ionicons name="trophy" size={100} color={colors.PRIMARY_TEXT} />
      </View>
      {achievements.length > 0 ? (
        <FlatList
          data={achievements}
          numColumns={2}
          columnWrapperStyle={{ justifyContent:"center",gap: 16 }}
          renderItem={renderAchievement}
          keyExtractor={(item) => item.id}
          style={styles.achievementsList}
        />
      ) : (
        <Text
          style={{
            color: colors.CTA,
            fontFamily: "Geist",
            fontSize: 18,
          }}
          className="text-center mt-4"
        >
          Add a achievement to get started
        </Text>
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
    gap: 16,
    minHeight: 80,

    // justifyContent: "space-between",
  },
  achievementTitle: {
    fontFamily: "Geist-Medium",
    fontSize: 16,
    color: colors.PRIMARY_TEXT,
    textAlign: "center",
    lineHeight: 18,
  },
  achievementDescription: {
    fontFamily: "Geist-Medium",
    color: colors.PRIMARY_TEXT + 90,
    marginTop: 5,
  },
  achievementsList: {
    width: "100%",
  },
});
