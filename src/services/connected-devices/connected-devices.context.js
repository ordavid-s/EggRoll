import React, { useState, createContext, useCallback, useEffect } from "react";

export const ConnectedDevicesContext = createContext();

export const ConnectedDevicesContextProvider = ({ children }) => {
  const [connectedDevices, setConnectedDevices] = useState([]);

  let connectedDevicesSet = new Set();

  const appendDevice = (device) => {
    if (!connectedDevicesSet.has(device.ip)) {
      setConnectedDevices((arr) => [...arr, device]);
      connectedDevicesSet.add(device.ip);
    }
  };

  const setDevices = (devices) => {
    setConnectedDevices((arr) => [...devices]);
  };

  const removeDevice = (deviceIp) => {
    connectedDevicesSet.delete(deviceIp);
    var filtered = connectedDevices.filter(function (el) {
      return el.ip != deviceIp;
    });
    setConnectedDevices((arr) => [...filtered]);
  };

  return (
    <ConnectedDevicesContext.Provider
      value={{
        connectedDevices,
        appendDevice,
        setDevices,
        removeDevice,
      }}
    >
      {children}
    </ConnectedDevicesContext.Provider>
  );
};
