import styled from 'styled-components';
import SideBar from "./SideBar";
import WhiteLogo from "../assets/LOGOS/logoBlanco.png";
import { useNavigate } from 'react-router-dom';

const Column = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 10vh;
  background-color: var(--primaryColor);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
`;

const Icon = styled.div`
  font-size: 160%;
  display: flex;
  justify-content: right;
  color: white;
  cursor: pointer;
  &:hover {
    color: var(--myWhite);
  }
`;

const Logo = styled.img`
  height: 115%;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Column style={{display: 'flex', justifyContent: 'left' }}>
        <SideBar />
      </Column>

      <Column>
        <Logo src={WhiteLogo} onClick={() => navigate('/')} />
      </Column>

      <Column>
        <Icon className="bi bi-person" onClick={() => navigate('/myProfile')} />
      </Column>
    </HeaderContainer>
  );
}

export default Header;
