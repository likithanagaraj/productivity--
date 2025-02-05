import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../utils/colors';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({ tabs }: { tabs: string[] }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.PRIMARY_BG },
        tabBarLabelStyle: { fontFamily: 'Geist-Medium', color: colors.PRIMARY_TEXT },
      }}
    >
      {tabs?.map((tab: string, index: number) => (
        <Tab.Screen name={tab} component={HomeScreen} key={index} />
      ))}
    </Tab.Navigator>
  );
}

export function HomeScreen() {
  return (
    <View style={{ backgroundColor: colors.PRIMARY_BG, height: '100%', width: '100%' }}>
      <Text>Home!</Text>
    </View>
  );
}
