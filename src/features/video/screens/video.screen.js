import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../components/utility/safe-area.component";

CenteredContainer = styled(SafeArea)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const VideoHub = () => {
  return <CenteredContainer></CenteredContainer>;
};
