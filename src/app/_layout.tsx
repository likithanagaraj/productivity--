import { Slot, Stack } from "expo-router";
import "../../global.css";
import { useColorScheme,StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function RootLayot() {
  
  return (
    <PaperProvider>
      <Stack >
      <Stack.Screen name="(tabs)" options={{headerShown:false}}  />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
    </PaperProvider>
  );
}


