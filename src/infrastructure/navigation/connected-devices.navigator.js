import React, { useContext, useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Spacer } from "../../components/spacer/spacer.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { ConnectedDevicesContext } from "../../services/connected-devices/connected-devices.context";
import { ConnectedDeviceScreen } from "../../features/connected-device/screens/connected-device.screen";

const Drawer = createDrawerNavigator();

export const ConnectedDevicesSideMenu = () => {
  const { connectedDevices } = useContext(ConnectedDevicesContext);
  const childFuncRef = React.useRef(null);

  return (
    <Drawer.Navigator>
      {connectedDevices.map((device) => {
        return (
          <Drawer.Screen
            key={device.ip}
            name={device.ip}
            component={ConnectedDeviceScreen}
            initialParams={{ device, childFuncRef }}
            options={{
              headerRight: () => (
                <Spacer position={"right"} size={"large"}>
                  <TouchableOpacity onPress={() => childFuncRef.current()}>
                    <MaterialCommunityIcons name={"reload"} size={16} />
                  </TouchableOpacity>
                </Spacer>
              ),
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
