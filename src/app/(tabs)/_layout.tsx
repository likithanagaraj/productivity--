import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "@expo/vector-icons/Ionicons";
import { PaperProvider } from "react-native-paper";
SplashScreen.preventAutoHideAsync();
const TabLAyout = () => {
  let [fontloaded] = useFonts(
    {
      'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Light': require('../../../assets/fonts/Poppins-Light.ttf'),
      'Poppins-ExtraLight': require('../../../assets/fonts/Poppins-ExtraLight.ttf'),
      'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Thin': require('../../../assets/fonts/Poppins-Thin.ttf'),
      'Poppins-ExtraBold': require('../../../assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
      
    }
  )
  if(!fontloaded){
    SplashScreen.hideAsync()
  }

  return (
    <PaperProvider>
     
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#D62059",
          headerShown: false,
          tabBarInactiveTintColor: "#999999",
          tabBarStyle: {
            backgroundColor: "#18181B",
            borderColor: "#18181B",
            boxShadow: "0.5px 0.5px 0.5px 0.5px white",
          },
          headerStyle: { backgroundColor: "#18181B" },
          headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="task"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={24} name="home" color={color} />
              <Ionicons name="file-tray-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Habits",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={22} name="trophy" color={color} />
              <Ionicons name="trophy-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={22} name="home" color={color} />
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="pomodoro"
          options={{
            title: "Pomodoro",
            tabBarIcon: ({ color }) => (
              // <FontAwesome size={21} name="hourglass-2" color={color} />
              <Ionicons name="hourglass-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="achievements"
          options={{
            title: "Achievements",
            tabBarIcon: ({ color }) => (
              <Ionicons name="trophy-outline" size={22} color={color} />
              // <FontAwesome size={24} name="trophy" color={color} />
            ),
          }}
        />
       
      </Tabs>
    </PaperProvider>
  );
};

export default TabLAyout;

const styles = StyleSheet.create({});
