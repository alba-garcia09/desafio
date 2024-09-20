import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import QRAlonso from '../../assets/qrAlonso.png'; // Importa tu imagen
import QREntrada from '../../assets/qrENTRADA.png'; // Importa tu imagen

// Keyframes for icon animation
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled-components
const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 500%;
  color: var(--primaryColor);
  cursor: pointer;
  animation: ${bounce} 1s infinite;
  transition: color 0.3s;

  &:hover {
    color: var(--secundaryColor);
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--primaryColor);
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: var(--secundaryColor);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => (props.isOpen ? 1 : 0)};
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => (props.isOpen ? 1 : 0)};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

// Check if token exists
const getToken = () => {
  // Replace this with your actual token retrieval logic
  return localStorage.getItem('token');
};

function MyProfile() {
  const [isModalOpen, setIsModalOpen] = useState(null); // null, 'entry', or 'linkedin'
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to the login page
    }
  }, [token, navigate]);

  // Return null while redirecting
  if (!token) {
    return null;
  }

  const openModal = (modalType) => {
    setIsModalOpen(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(null);
  };

  return (
    <Container>
      <Icon
        className="bi bi-person-circle"
        onClick={() => openModal('linkedin')} // Open LinkedIn modal on icon click
      ></Icon>
      <h1>Alonso Calvo</h1>
      <h3 style={{ color: 'var(--primaryColor)' }}>EDEM</h3>
      <p>Student</p>
      <Button onClick={() => openModal('entry')}>Ver mi entrada</Button>

      <ModalOverlay isOpen={isModalOpen === 'entry'}>
        <ModalContent isOpen={isModalOpen === 'entry'}>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <Image src={QRAlonso} alt="QR Alonso" />
          <p style={{ color: 'var(--primaryColor)' }}>Mi entrada</p>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay isOpen={isModalOpen === 'linkedin'}>
        <ModalContent isOpen={isModalOpen === 'linkedin'}>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <Image src={QREntrada} alt="QR Alonso" />
          <p style={{ color: 'var(--primaryColor)' }}>Escanea mi LinkedIn</p>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}

export default MyProfile;





// import styled from 'styled-components';
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// // Styled-components
// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   max-width: 1000px;
//   margin: 0 auto;
//   padding: 0 20px;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   @media (max-width: 767px) {
//     max-width: 100%;
//     padding: 0 10px;
//   }
// `;

// const Icon = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 500%;
//   color: var(--primaryColor);
//   cursor: pointer;
//   &:hover {
//     color: var(--secundaryColor);
//   }
// `;

// // Check if token exists
// const getToken = () => {
//   // Replace this with your actual token retrieval logic
//   return localStorage.getItem('token');
// };

// function MyProfile() {
//   const navigate = useNavigate();
//   const token = getToken();

//   useEffect(() => {
//     if (!token) {
//       navigate('/login'); // Redirect to the register page
//     }
//   }, [token, navigate]);

//   // Return null while redirecting
//   if (!token) {
//     return null;
//   }

//   return (
//     <Container>
//       <Icon className="bi bi-person-circle"></Icon>
//       <h1>Alonso Calvo</h1>
//       <h3 style={{ color: 'var(--primaryColor)' }}>EDEM</h3>
//       <p>Student</p>
//       <button>Ver mi entrada</button>
//     </Container>
//   );
// }

// export default MyProfile;
