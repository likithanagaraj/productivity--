import { Slot, Stack } from "expo-router";
import "../../global.css";
import { useColorScheme, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayot() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
     <BottomSheetModalProvider>
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
          name="(screens)/task-category"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(screens)/new-achievements"
          options={{ headerShown: false }}
        />
      </Stack>
    </PaperProvider>
     </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
