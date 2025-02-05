import { Slot, Stack } from "expo-router";
import "../../global.css";
import { useColorScheme, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayot() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/newhabit"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/newtask"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/boolean-category"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/numeric-category"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/checklist-category"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/habit-schedule"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/task-category"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/new-achievements"
          options={{ headerShown: false }}
        />
      </Stack>
    </PaperProvider>
    </GestureHandlerRootView>
  );
}
