import React, { useState, createContext } from "react";
import { ConnectedDevice } from "./connected-device";
import HotspotManager, {
  Device,
  TetheringError,
} from "@react-native-tethering/hotspot";

export const ConnectedDevicesContext = createContext();

export const ConnectedDevicesContextProvider = ({ children }) => {
  const [connectedDevices, setConnectedDevices] = useState([
    new ConnectedDevice("10.0.0.6"),
  ]);

  const appendDevice = (device) => {
    setConnectedDevices((arr) => [...arr, device]);
  };

  const setDevices = (devices) => {
    setConnectedDevices((arr) => [...devices]);
  };

  const removeDevice = (deviceIp) => {
    var filtered = connectedDevices.filter(function (el) {
      return el.ip != deviceIp;
    });
    setConnectedDevices((arr) => [...filtered]);
  };

  const scanForDevices = () => {
    async function getDevices() {
      try {
        const devices = await HotspotManager.getConnectedDevices();
        return devices;
      } catch (error) {
        if (error instanceof TetheringError) {
          console.log("tether error");
          return [];
        }
        console.log(error);
        return [];
      }
    }
    console.log("scanning for devices");
    deviceList = getDevices()
      .then((deviceList) => {
        setDevices(deviceList.map((d) => d.ipAddress));
      })
      .catch(() => {
        console.log("error scanning");
      });
  };

  return (
    <ConnectedDevicesContext.Provider
      value={{
        connectedDevices,
        appendDevice,
        setDevices,
        removeDevice,
        scanForDevices,
      }}
    >
      {children}
    </ConnectedDevicesContext.Provider>
  );
};
