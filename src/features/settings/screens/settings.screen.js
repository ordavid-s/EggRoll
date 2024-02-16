import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";

import { UdpServerContext } from "../../../services/udp-server/udp-server.context";
import { ConnectedDevicesContext } from "../../../services/connected-devices/connected-devices.context";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import HotspotManager, {
  Device,
  TetheringError,
} from "@react-native-tethering/hotspot";

import styled from "styled-components";

CenteredContainer = styled(SafeArea)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const isHotspotEnabled = async () => {
  try {
    const state = await HotspotManager.isHotspotEnabled();
    if (state) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof TetheringError) {
      console.log(error.message);
      return false;
    }
    return false;
    console.log(error);
  }
};

export const Settings = () => {
  const [hotspotStatus, setHotspotStatus] = useState(false);
  const { scanForDevices } = useContext(ConnectedDevicesContext);
  const { startServer, endServer } = useContext(UdpServerContext);

  useEffect(() => {
    startServer();
    return () => endServer();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      isHotspotEnabled().then((res) => {
        if (res === false && hotspotStatus === true) {
          Toast.show("Hotspot deactivated", {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
        }
        setHotspotStatus(res);
      });
    }, 3000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [hotspotStatus]);

  const toggleHotspotOnPress = useCallback(() => {
    async function toggleLocalHotspot(state) {
      try {
        console.log(state);
        await HotspotManager.setHotspotEnabled(state);
        Toast.show(`Local Hotspot ${state ? "enabled" : "disabled"}`, {
          duration: Toast.durations.SHORT,
          animation: true,
          hideOnPress: true,
        });
      } catch (error) {
        if (error instanceof TetheringError) {
          Toast.show("Error starting Local Hotspot: " + error, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
            backgroundColor: "red",
          });
          console.log(error);
        }
        console.log(error);
      }
    }

    // Toggle hotspot status
    if (hotspotStatus) {
      toggleLocalHotspot(false).then(() => {
        setHotspotStatus(false);
      });
    } else {
      toggleLocalHotspot(true).then(() => {
        setHotspotStatus(true);
      });
    }
  }, [hotspotStatus]);
  const hotspotButtonText = hotspotStatus
    ? "Deactivate Hotspot"
    : "Activate Hotspot";
  const hotspotButtonColor = hotspotStatus ? "#dc3545" : "#007bff";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotspot Settings</Text>
      <Text style={styles.status}>Status: {hotspotStatus ? "On" : "Off"}</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={toggleHotspotOnPress}
          color={hotspotButtonColor}
        >
          {hotspotButtonText}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
