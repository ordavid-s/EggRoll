import React from "react";
import { PermissionsAndroid } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { RoundButton } from "../components/round-button.component";
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

export const Settings = () => {
  const onPress = async () => {
    try {
      await HotspotManager.setHotspotEnabled(true);
      console.log("Hotspot Enabled");
    } catch (error) {
      if (error instanceof TetheringError) {
        console.log(error.message);
      }
      console.log(error);
    }
  };
  return (
    <CenteredContainer>
      <RoundButton onPress={onPress}></RoundButton>
    </CenteredContainer>
  );
};
