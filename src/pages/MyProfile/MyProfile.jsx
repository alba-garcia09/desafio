import styled from 'styled-components';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
  &:hover {
    color: var(--secundaryColor);
  }
`;

function MyProfile() {
  return (
    <>
      <Container>
        <Icon className="bi bi-person-circle"></Icon> {/* Uso de className en lugar de class */}
        <h1>Alonso Calvo</h1>
        <h3 style={{ color: 'var(--primaryColor)' }}>EDEM</h3>
        <p>Student</p>
      </Container>
    </>
  );
}

export default MyProfile;
