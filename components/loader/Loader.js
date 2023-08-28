import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

const rotate = keyframes`
    to {
      transform: rotate(.5turn);
    }
  `;

const CustomLoader = styled.div`
  width: 50px;
  height: 50px;
  --c: radial-gradient(
    farthest-side,
    ${(props) => props.secondaryColor || "#3b82f6"} 92%,
    #0000
  );
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  animation: ${rotate} 1s infinite;
  position: absolute;
`;
const Loader = () => {
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  return (
    <CustomLoader primaryColor={primaryColor} secondaryColor={secondaryColor} />
  );
};

export default Loader;
