import React from 'react';
import styled from 'styled-components';
import StripeLogo from '../assets/LOGOS/stripe-3.png';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(99, 19, 242, 0.9);
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const LoadingStripe = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Overlay>
      <LogoContainer>
        <img src={StripeLogo} alt="Loading..." style={{ width: '100px', height: 'auto' }} />
      </LogoContainer>
    </Overlay>
  );
};

export default LoadingStripe;
