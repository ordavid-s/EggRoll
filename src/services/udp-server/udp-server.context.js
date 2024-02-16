import React, { useState, createContext, useContext, useEffect } from "react";
import { ConnectedDevice } from "../connected-devices/connected-device";
import { ConnectedDevicesContext } from "../connected-devices/connected-devices.context";
import dgram from "react-native-udp";

export const UdpServerContext = createContext();

export const UdpServerContextProvider = ({ children }) => {
  const defaultPort = 8888;
  const { appendDevice, removeDevice } = useContext(ConnectedDevicesContext);
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [socket, setSocket] = useState(null);

  const [devicesLastSeen, setDevicesLastSeen] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      for (const ip in devicesLastSeen) {
        if (!devicesLastSeen[ip]) {
          removeDevice(ip);
        }
        devicesLastSeen[ip] = false;
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [devicesLastSeen]);

  const startServer = () => {
    const server = dgram.createSocket("udp4");
    server.on("message", (data, rinfo) => {
      let dev = new ConnectedDevice(rinfo["address"]);
      devicesLastSeen[rinfo["address"]] = true;
      appendDevice(dev);
    });

    server.on("listening", () => {
      setIsServerRunning(true);
    });

    server.bind(defaultPort);
    setSocket(server);
  };

  const endServer = () => {
    if (socket !== null) {
      socket.close();
    }
    setIsServerRunning(false);
    setSocket(null);
  };

  return (
    <UdpServerContext.Provider
      value={{
        isServerRunning,
        startServer,
        endServer,
      }}
    >
      {children}
    </UdpServerContext.Provider>
  );
};
