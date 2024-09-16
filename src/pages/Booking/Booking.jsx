import { useState, useEffect } from 'react';
import LoadingStripe from "../../components/SpinnerBooking";
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingStripe isLoading={isLoading} />

      {!isLoading && (
        <Container>
          <h2>Reserva realizada con éxito</h2>
          <button onClick={() => navigate('/')}>Quiero seguir navegando</button>
        </Container>
      )}
    </>
  );
}

export default Booking;
