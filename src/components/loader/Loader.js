import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(.5turn);
  }
`;

const CustomLoader = styled.div`
  width: 50px;
  height: 50px;
  --c: radial-gradient(farthest-side, #3b82f6 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  animation: ${rotate} 1s infinite;
  position: absolute;
`;

const Loader = () => {
  return <CustomLoader />;
};

export default Loader;
