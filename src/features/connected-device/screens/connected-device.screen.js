import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { WebView } from "react-native-webview";

import { SafeArea } from "../../../components/utility/safe-area.component";

CenteredContainer = styled(SafeArea)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ConnectedDeviceScreen = ({ device }) => {
  // return <WebView source={{ uri: device.url }} />;
  return <WebView source={{ uri: "https://infinite.red" }} />;
};
