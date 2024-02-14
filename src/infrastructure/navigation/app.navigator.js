import React, { useContext } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";

import { View } from "react-native";
import { ConnectedDeviceScreen } from "../../features/connected-device/screens/connected-device.screen";
import { Settings } from "../../features/settings/screens/settings.screen";
import { ConnectedDevicesContextProvider } from "../../services/connected-devices/connected-devices.context";
import { DeviceViewer } from "../../features/device-viewer/screens/device-viewer.screen";

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
  <ConnectedDevicesContextProvider>
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Cameras" component={DeviceViewer} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </ConnectedDevicesContextProvider>
);
