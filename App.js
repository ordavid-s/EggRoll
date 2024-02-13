import React, { useEffect } from "react";
import { PermissionsAndroid, Linking } from "react-native";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";

import { Navigation } from "./src/infrastructure/navigation";

const requestPermissions = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
  ]);

  console.log("granted", granted);
  return granted;
};

export default function App() {
  useEffect(() => {
    async function getPerm() {
      console.log("requesting");
      const permissionStatus = await requestPermissions();
      console.log("permissionStatus", permissionStatus);
      if (
        permissionStatus[PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] ===
        "granted"
      ) {
        console.log("granted permission");
      } else if (
        permissionStatus[PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] ===
        "never_ask_again"
      ) {
        // Linking.openSettings();
      }
    }
    getPerm();
  }, []);
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}
