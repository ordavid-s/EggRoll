import React, { useEffect, useRef } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { WebView } from "react-native-webview";
import { IconButton } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";

const CenteredContainer = styled(SafeArea)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled(View)`
  align-items: right;
`;

const ScreenContainer = styled(View)`
  flex: 1;
`;

export const ConnectedDeviceScreen = ({ route }) => {
  const webViewRef = useRef();
  const { device, childFuncRef } = route.params;

  useEffect(() => {
    childFuncRef.current = () => webViewRef.current.reload();
  }, [childFuncRef.current]);
  return (
    <ScreenContainer>
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        source={{ uri: device.url }}
      />
    </ScreenContainer>
  );
  // return <WebView source={{ uri: "https://infinite.red" }} />;
};
