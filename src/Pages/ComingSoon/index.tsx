import React from "react";
import styled from "styled-components";

const ComingSoon = () => {
  return (
    <ComingSoonWrapper>
      We are adding new features... stay tuned!
    </ComingSoonWrapper>
  );
};

export default ComingSoon;

const ComingSoonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
