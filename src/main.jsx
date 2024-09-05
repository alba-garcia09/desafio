import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './AppRouter.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styled from 'styled-components';
import Header from '../src/components/Header.jsx'

const Pages = styled.main`
  margin-top: 10vh;
  margin-bottom: 5vh;
  height: 85vh;
  overflow-y: auto;
  background-color: white;
  color: black;
  width: 100%;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 5vh;
  font-size: 70%;
  background-color: var(--primaryColor);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header/>
    <Pages>
      <AppRouter />
    </Pages>
    <Footer>
      E-LEARNING EXPERIENCE by SAMOO
    </Footer>
  </BrowserRouter>
);
