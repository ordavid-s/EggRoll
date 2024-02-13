import React, { useContext } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";

import { View } from "react-native";
import { VideoHub } from "../../features/video/screens/video.screen";
import { Settings } from "../../features/settings/screens/settings.screen";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

const TAB_ICON = {
  Cameras: "video",
  Settings: "cog",
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Cameras" component={VideoHub} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
