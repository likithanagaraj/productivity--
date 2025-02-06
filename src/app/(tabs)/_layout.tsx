import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";
import { PaperProvider } from "react-native-paper";
import colors from "../../../utils/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
SplashScreen.preventAutoHideAsync();
const TabLAyout = () => {

  let [fontloaded] = useFonts(
    {
      'Geist-Bold': require('../../../assets/fonts/Geist-Bold.ttf'),
      'Geist-ExtraBold': require('../../../assets/fonts/Geist-ExtraBold.ttf'),
      'Geist-Light': require('../../../assets/fonts/Geist-Light.ttf'),
      'Geist-Medium': require('../../../assets/fonts/Geist-Medium.ttf'),
      'Geist-Regular': require('../../../assets/fonts/Geist-Regular.ttf'),
      'Geist-SemiBold': require('../../../assets/fonts/Geist-SemiBold.ttf'),
      'Geist-Thin': require('../../../assets/fonts/Geist-Thin.ttf'),
      
    }
  )
  if(!fontloaded){
    SplashScreen.hideAsync()
  }

  return (
    <PaperProvider>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.CTA,
          headerShown: false,
          tabBarInactiveTintColor:  "#999999",
          tabBarStyle: {
            backgroundColor: colors.PRIMARY_BG,
            borderColor: colors.LIGHT_BG,
            boxShadow: "0.5px 0.5px 0.5px 0.5px white",
          },
          // headerStyle: { backgroundColor: colors.PRIMARY_BG },
          // headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="task"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={24} name="home" color={color} />
              <Ionicons name="file-tray" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Habits",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={22} name="trophy" color={color} />
              <Ionicons name="trophy" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={22} name="home" color={color} />
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="pomodoro"
          options={{
            title: "Pomodoro",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={21} name="hourglass-2" color={color} />
              <Ionicons name="hourglass" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="achievements"
          options={{
            title: "Achievements",
            tabBarIcon: ({ color }) => (
              // <Ionicons name="medal-outline" size={22} color={color} />
              <FontAwesome5 size={21} name="medal" color={color} />
            ),
          }}
        />
       
      </Tabs>
     
    </PaperProvider>
  );
};

export default TabLAyout;

const styles = StyleSheet.create({});
