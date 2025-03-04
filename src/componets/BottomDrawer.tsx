import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input } from "@ui-kitten/components";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import colors from "../../utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Button, SegmentedButtons } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CategoryList } from "../app/(screens)/task-category";
const BottomDrawer = () => {
  const [value, setValue] = React.useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const data = [
    { id: 1, label: "Work", icon: "briefcase" },
    { id: 2, label: "Study", icon: "school" },
    { id: 3, label: "Travel", icon: "airplane" },
    { id: 4, label: "Music", icon: "musical-notes" },
    { id: 5, label: "Food", icon: "fast-food" },
    { id: 6, label: "Gym", icon: "barbell" },
    { id: 7, label: "Gaming", icon: "game-controller" },
    { id: 8, label: "Movies", icon: "film" },
    { id: 9, label: "Books", icon: "book" },
  ];
  return (
    <View className="flex flex-col gap-12 ">
      <Text className="font-geistMedium text-xl text-PRIMARY_TEXT">
        Task Name
      </Text>
      <View className="flex flex-col gap-6">
        <View className="flex flex-row items-center gap-8 ">
          <Text className="font-geistRegular text-[14px] text-PRIMARY_TEXT">
            Create New Task
          </Text>
          <BottomSheetTextInput
            placeholderTextColor={colors.PRIMARY_TEXT + 80}
            className="border border-white w-[183px]  rounded-[5px] text-white pl-3"
            placeholder="Task Title"
          />
        </View>
        <View className="flex flex-row items-center justify-between ">
          <Text className="font-geistRegular text-[14px] text-PRIMARY_TEXT">
            Category
          </Text>

          <View className="flex flex-row items-center gap-4">
            <Text className="font-semibold text-[14px] text-PRIMARY_TEXT">
              Work
            </Text>

            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View className="flex flex-col gap-5" style={styles.modalView}>
                  <Text className="font-GeistSemiBold text-[20px] text-PRIMARY_TEXT">
                    Category
                  </Text>
                  <View className="flex flex-row gap-4">
                    <View className="flex flex-wrap flex-row justify-between ">
                      {data.map((item) => (
                        <View
                          key={item.id}
                          className="w-1/3 p-2 items-center gap-1"
                        >
                          <Text className="font-medium text-[12px] text-PRIMARY_TEXT">
                            {item.label}
                          </Text>
                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            className="h-10 w-10 bg-LIGHT_BG border border-white rounded-full flex items-center justify-center"
                          >
                            <Ionicons
                              name={item.icon as keyof typeof Ionicons.glyphMap}
                              size={20}
                              color={colors.PRIMARY_TEXT}
                            />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Ionicons
                    className="absolute top-5 right-5"
                    name="close"
                    size={24}
                    color={colors.PRIMARY_TEXT}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </Modal>

            <Pressable
              onPress={() => setModalVisible(true)}
              className="h-10 w-10 bg-LIGHT_BG border  border-white rounded-full flex items-center justify-center"
            >
              <Ionicons
                name="briefcase"
                size={16}
                color={colors.PRIMARY_TEXT}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "Low",
                label: "Low",
                testID: "1",
                style: {
                  borderRadius: 5,
                  borderColor: "#666666",
                  backgroundColor:
                    value === "Low" ? "green" : colors.LIGHT_BG,
                },
                labelStyle: {
                  color:
                    value === "Low" ? colors.PRIMARY_TEXT : colors.PRIMARY_TEXT,
                  fontFamily:
                    value === "Low" ? "Geist-SemiBold" : "Geist-Regular",
                },
              },
              {
                value: "Medium",
                label: "Medium",
                testID: "2",
                style: {
                  backgroundColor:
                    value === "Medium" ? "yellow" : colors.LIGHT_BG,
                  borderColor: "#666666",
                },
                labelStyle: {
                  color:
                    value === "Medium"
                      ? colors.PRIMARY_BG
                      : colors.PRIMARY_TEXT,
                  fontFamily:
                    value === "Medium" ? "Geist-SemiBold" : "Geist-Regular",
                },
              },
              {
                value: "High",
                label: "High",
                testID: "3",
                style: {
                  borderRadius: 5,
                  borderColor: "#666666",
                  backgroundColor:
                    value === "High" ? "red" : colors.LIGHT_BG,
                },
                labelStyle: {
                  color:
                    value === "High" ? colors.PRIMARY_TEXT : colors.PRIMARY_TEXT,
                  fontFamily:
                    value === "High" ? "Geist-SemiBold" : "Geist-Regular",
                },
              },
            ]}
          />
        </View>
      </View>
      <Button
        labelStyle={{ color: colors.PRIMARY_BG, fontFamily: "Geist-SemiBold" }}
        mode="contained"
        style={styles.submitButton}
      >
        Create Task
      </Button>
    </View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.CTA,
    borderRadius: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backfaceVisibility: "hidden",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: colors.PRIMARY_BG,
    borderRadius: 5,
    padding: 35,
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 300,
  },
  button: {
    borderRadius: 20,
    // padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
