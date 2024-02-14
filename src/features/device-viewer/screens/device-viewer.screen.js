import React, { useContext } from "react";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { ConnectedDevicesContext } from "../../../services/connected-devices/connected-devices.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ConnectedDevicesSideMenu } from "../../../infrastructure/navigation/connected-devices.navigator";

const CenteredBackground = styled(SafeArea)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyDeviceListScreen = () => {
  return (
    <CenteredBackground>
      <Text variant={"title"}> No Devices Connected </Text>
    </CenteredBackground>
  );
};

export const DeviceViewer = () => {
  const { connectedDevices } = useContext(ConnectedDevicesContext);
  return (
    <>
      {connectedDevices.length === 0 ? (
        <EmptyDeviceListScreen />
      ) : (
        <ConnectedDevicesSideMenu />
      )}
    </>
  );
};
