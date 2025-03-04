import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import colors from "../../../utils/colors";
import { getAchievements } from "../../../utils/storage";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomDrawer from "../../componets/BottomDrawer";
import BottomSheetAchievment from "../../componets/BottomSheet-Achievment";

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
      params: { id },
    });
  };
  const renderAchievement = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => editEnable(item.id)}
      style={styles.achievementItem}
    >
      <Text
        className="text-4xl
        "
      >
        🎖️
      </Text>
      {/* <FontAwesome5 name="medal" size={24} color={colors.PRIMARY_TEXT} /> */}
      <View className="flex flex-col -mt-2">
        <Text style={styles.achievementTitle}>{item.title}</Text>
        {/* <Text style={styles.achievementDescription}>{item.description}</Text> */}
      </View>
    </TouchableOpacity>
  );
  // State that manages the visibility of the bottom drawer
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClose = useCallback((event: GestureResponderEvent) => {
    bottomSheetModalRef.current?.close();
  }, []);

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
          columnWrapperStyle={{ justifyContent: "center", gap: 16 }}
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

      {/*Route: For Creating new achievment  */}

      <Pressable
        onPress={handlePresentModalPress}
        className="absolute bottom-8 right-8 m-2  "
      >
        <View
          style={{ backgroundColor: colors.PRIMARY_TEXT }}
          className="p-3 rounded-full"
        >
          <Ionicons name="add-outline" size={28} color={colors.PRIMARY_BG} />
        </View>
      </Pressable>

      <Pressable>
        <BottomSheetModal
          // index={0}
          // snapPoints={["55%"]}
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{ height: 0 }}
          handleStyle={{ backgroundColor: colors.PRIMARY_BG }}
          enableOverDrag={false}
          enablePanDownToClose={false}
          android_keyboardInputMode="adjustResize"
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backdropComponent={() => (
            <Pressable
              onPress={handleClose}
              className="absolute h-full w-[400px] bg-black/80 top-0"
            ></Pressable>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetAchievment />
          </BottomSheetView>
        </BottomSheetModal>
      </Pressable>
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
  contentContainer: {
    // flex: 1,
    // alignItems: "flex-start",
    paddingHorizontal: 25,
    backgroundColor: colors.PRIMARY_BG,
    height: 330,
  },
});
