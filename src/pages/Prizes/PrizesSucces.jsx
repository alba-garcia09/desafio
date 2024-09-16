import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--primaryColor);
`;

function Booking() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <h2>Inscripción realizada con éxito</h2>
        <button onClick={() => navigate('/')}>Quiero seguir navegando</button>
      </Container>
    </>
  );
}

export default Booking;
