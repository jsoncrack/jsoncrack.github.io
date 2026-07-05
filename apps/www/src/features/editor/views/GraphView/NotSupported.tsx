import React from "react";
import { Overlay, Stack, Text } from "@mantine/core";
import styled, { keyframes } from "styled-components";
import useConfig from "../../../../store/useConfig";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px 48px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.12),
    0 1px 3px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  max-width: 460px;
  width: 90%;
  animation: ${fadeIn} 0.4s ease-out;
  position: relative;
  overflow: hidden;
  z-index: 10;

  &[data-dark="true"] {
    background: rgba(37, 38, 43, 0.95);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const NotSupported = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <Overlay backgroundOpacity={0.6} color={darkmodeEnabled ? "#111" : "#e2f0f3"} blur="3" center>
      <CardWrapper data-dark={darkmodeEnabled}>
        <Stack align="center" gap="md">
          <Text fz="24" fw={700} c={darkmodeEnabled ? "white" : "dark"} ta="center" lh={1.2}>
            Your diagram is too large
          </Text>
          <Text ta="center" size="sm" c="dimmed" maw="360" lh={1.5}>
            The provided data is too large to render as a graph in the browser.
          </Text>
        </Stack>
      </CardWrapper>
    </Overlay>
  );
};

