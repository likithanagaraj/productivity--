import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Portal, RadioButton } from "react-native-paper";
import colors from "../../utils/colors";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
const ProjectDrawer = () => {
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState("first");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyleMusic = { backgroundColor: "white", padding: 20 };
  const containerStyle = {
    backgroundColor: colors.PRIMARY_BG,
    padding: 20,
    margin: 30,
    borderRadius: 5,
  };

  // Create new task/project to track time
  const [newProj, setNewProj] = React.useState(false);
  return (
    <View>
      <View className="flex flex-col gap-10">
        <Text className="text-PRIMARY_TEXT font-geistMedium text-xl">
          Select the Task
        </Text>

        <View className="flex flex-col  gap-3 ">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-PRIMARY_TEXT/70 font-geistRegular text-[15px]">
              UI UX
            </Text>
            <RadioButton
              color={colors.CTA}
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-PRIMARY_TEXT/70 font-geistRegular text-[15px]">
              React Native
            </Text>
            <RadioButton
              color={colors.CTA}
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
          </View>
        </View>

        <View className="flex flex-row gap-4 justify-between">
          <Modal
            animationType="none"
            transparent={true}
            visible={newProj}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setNewProj(!newProj);
            }}
          >
            <View style={styles.centeredView}>
              <View className="flex flex-col gap-5 " style={styles.modalView}>
                <Text className=" font-GeistSemiBold text-[20px]  text-PRIMARY_TEXT">
                  Create New Task
                </Text>
                <View className="flex flex-col gap-10">
                  <BottomSheetTextInput
                    placeholderTextColor={colors.PRIMARY_TEXT + 80}
                    className="border w-[260px] border-white   rounded-[5px] text-white pl-3 bg-LIGHT_BG "
                    placeholder="Enter Task Name"
                  />
                  <View className="flex flex-row gap-4 justify-between">
                    <Button
                      onPress={() => setNewProj(!newProj)}
                      className=""
                      textColor="white"
                      mode="contained"
                      style={styles.submitButton2}
                    >
                      Cancel
                    </Button>
                    <Button
                    onPress={() => setNewProj(!newProj)}
                      textColor={colors.PRIMARY_BG}
                      className="w-44 "
                      mode="contained"
                      style={styles.submitButton}
                      
                    >
                      <Text className="text-[14px] font-geistBold ">
                        {" "}
                        Confirm{" "}
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <Button
            onPress={() => setNewProj(true)}
            className=""
            textColor="white"
            mode="contained"
            style={styles.submitButton2}
          >
            <View className="flex flex-row items-center ">
              <Text className="text-[14px] font-geistBold text-PRIMARY_TEXT">
                
                Create
              </Text>

              <Ionicons
                name="add-circle-outline"
                size={18}
                color={colors.PRIMARY_TEXT}
              />
            </View>
          </Button>
          <Button
            textColor={colors.PRIMARY_BG}
            className="w-52 "
            mode="contained"
            style={styles.submitButton}
            onPress={hideModal}
          >
            <Text className="text-[14px] font-geistBold "> Confirm </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProjectDrawer;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,
  },
  createsubmitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backfaceVisibility: "hidden",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  submitButton2: {
    backgroundColor: colors.PRIMARY_BG,
    borderRadius: 7,
    borderColor: colors.PRIMARY_TEXT,
    borderWidth: 1,
  },
  modalView: {
    overflow: "hidden",
    backgroundColor: colors.PRIMARY_BG,
    borderRadius: 5,
    paddingHorizontal: 20,
    // paddingVertical: 30,
    // display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 250,
  },
});
