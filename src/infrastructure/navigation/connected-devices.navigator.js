import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ConnectedDevicesContext } from "../../services/connected-devices/connected-devices.context";
import { ConnectedDeviceScreen } from "../../features/connected-device/screens/connected-device.screen";

const Drawer = createDrawerNavigator();

export const ConnectedDevicesSideMenu = () => {
  const { connectedDevices } = useContext(ConnectedDevicesContext);

  return (
    <Drawer.Navigator>
      {connectedDevices.map((device) => {
        return (
          <Drawer.Screen
            key={device.ip}
            name={device.ip}
            component={ConnectedDeviceScreen}
            initialParams={{ device }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
