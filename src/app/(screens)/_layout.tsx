// (screens)/_layout.tsx
import { Stack } from 'expo-router';

export default function ScreenLayout() {
  return (
    
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'New Habit', // Set the desired header title
        // Add more header customization options as needed
      }}
    />
  );
}