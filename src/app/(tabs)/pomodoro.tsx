import {
  Pressable,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
  PanResponder,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import colors from "../../../utils/colors";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Button, Modal, Portal, RadioButton } from "react-native-paper";
import { hide } from "expo-splash-screen";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheetAchievment from "../../componets/BottomSheet-Achievment";
import ProjectDrawer from "../../componets/ProjectDrawer";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { AnimatedText } from "react-native-reanimated/lib/typescript/component/Text";
const Pomodoro = () => {
  const [musicVisibility, setmusicVisibility] = React.useState(false);
  const showMusicModal = () => setmusicVisibility(true);
  const hideMusicModal = () => setmusicVisibility(false);
  const containerStyleMusic = { backgroundColor: "white", padding: 20 };
  const containerStyle = {
    backgroundColor: colors.PRIMARY_BG,
    padding: 20,
    margin: 30,
    borderRadius: 5,
  };

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

  // Pomodoro
  const [defaultFocusTime, setDefaultFocusTime] = useState(30 * 60);
  const [FocusButton, setFocusButton] = useState("Pause");
  const [isRunning, setisRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const formattedTime = `${Math.floor(defaultFocusTime / 60)}:${String(
    defaultFocusTime % 60
  ).padStart(2, "0")}`;

  const handleFocusTime = () => {
    // if timer is  running we need to pause it
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setisRunning(false);
      setFocusButton("Play");
    } else {
      intervalRef.current = setInterval(() => {
        setDefaultFocusTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setisRunning(true);
      setFocusButton("Pause");
    }
  };
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setisRunning(false);
    setDefaultFocusTime(30 * 60);
    setFocusButton("Start to focus");
  };
  const lastTouchY = useRef(0);

  const panResponder = useRef (
    PanResponder.create({
      onStartShouldSetPanResponder:() =>true,
      onMoveShouldSetPanResponder:()=>true,
      onPanResponderGrant:(_,gestureState)=>{
        lastTouchY.current =gestureState.y0
      },
      onPanResponderMove:(_,gestureState)=>{
        const diff  = lastTouchY.current - gestureState.moveY
        if(Math.abs(diff) > 30){
          setDefaultFocusTime((prev)=>(diff > 0 ? prev +1 :prev-1))
        
          lastTouchY.current =gestureState.moveY
        }
      }
    })
  ).current

  return (
    <View className=" h-full w-full p-6 bg-PRIMARY_BG flex flex-col gap-36">
      <View className="flex flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Geist-Bold", color: colors.PRIMARY_TEXT }}
          className="text-[18px]"
        >
          Pomodoro
        </Text>
        <Portal>
          <Modal
            visible={musicVisibility}
            onDismiss={hideMusicModal}
            contentContainerStyle={containerStyleMusic}
          >
            <Music />
          </Modal>
        </Portal>
        <FontAwesome5
          onPress={showMusicModal}
          name="music"
          size={16}
          color={colors.PRIMARY_TEXT}
        />
        {/* <Ionicons name="musical-notes" size={20} color={colors.PRIMARY_TEXT} /> */}
      </View>
      {/* Pomodoro */}
      <View className="flex flex-col items-center justify-center gap-16">
        {/* Clock */}
        <View className="flex flex-col items-center justify-center gap-4">
          <View {...panResponder.panHandlers}  className="flex items-center justify-center h-[250px] w-[250px] rounded-full border-2 border-white   ">
            <Text className="font-geistBold text-PRIMARY_TEXT text-[42px]">
              {formattedTime}
            </Text>
          </View>
          <View className="flex flex-col items-center justify-center gap-2">
            <Button onPress={handlePresentModalPress}>
              <View className="flex flex-row items-center gap-2">
                <Text className="text-[14px] font-geistRegular text-TextCTA">
                  Select a task
                </Text>
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={16}
                  color={colors.CTA}
                />
              </View>
            </Button>

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
                  <ProjectDrawer />
                </BottomSheetView>
              </BottomSheetModal>
            </Pressable>
            {isRunning ? (
              <View className="flex flex-row items-center gap-4">
                <Button
                  onPress={reset}
                  mode="contained"
                  style={styles.submitButton}
                >
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-[14px] font-geistBold ">Reset</Text>
                    <FontAwesome
                      name="refresh"
                      size={15}
                      color={colors.LIGHT_BG}
                    />
                    {/* <Ionicons name="refresh" size={18} color={colors.PRIMARY_BG} /> */}
                  </View>
                </Button>
                <Button
                  onPress={handleFocusTime}
                  mode="contained"
                  style={styles.submitButton}
                >
                  <View className="flex flex-row items-center ">
                    <Text className="text-[14px] font-geistBold ">Pause</Text>

                    <Ionicons name="pause" size={16} color={colors.LIGHT_BG} />
                  </View>
                </Button>
              </View>
            ) : (
              <Button
                onPress={handleFocusTime}
                mode="contained"
                style={styles.submitButton}
              >
                <View className="flex flex-row items-center ">
                  <Text className="text-[14px] font-geistBold ">
                    Start to Focus
                  </Text>
                  <Ionicons name="play" size={18} color={colors.LIGHT_BG} />
                </View>
              </Button>
            )}
          </View>
        </View>

        {/* Focus Time */}
        <View className="flex flex-col items-center justify-center  ">
          <Text className="text-PRIMARY_TEXT/70 font-geistRegular  text-[14px]">
            Total Focus Time
          </Text>
          <Text className="text-PRIMARY_TEXT font-semibold  text-xl">0:00</Text>
        </View>
      </View>
    </View>
  );
};

export default Pomodoro;

const Music = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: colors.PRIMARY_BG,
    padding: 20,
    margin: 30,
    borderRadius: 5,
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text className="text-PRIMARY_TEXT">
            Exsvdnample Modal. Click outside this area to dismiss.
          </Text>
        </Modal>
      </Portal>
      <Ionicons
        onPress={showModal}
        name="add-circle-outline"
        size={25}
        color={colors.CTA}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,

    // marginBottom: 20,
  },
  submitButton2: {
    backgroundColor: colors.PRIMARY_BG,
    borderRadius: 7,
    borderColor: colors.PRIMARY_TEXT,
    borderWidth: 1,
    // marginBottom: 20,
  },
  contentContainer: {
    // flex: 1,
    // alignItems: "flex-start",
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: colors.PRIMARY_BG,
    // height: ,
  },
});
