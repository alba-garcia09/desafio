import { useState, useEffect } from 'react';
import LoadingStripe from "../../components/SpinnerBooking";
import styled from 'styled-components';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingStripe isLoading={isLoading} />

      {!isLoading && (
        <Container>
          <b>Reserva realizada con éxito</b>
        </Container>
      )}
    </>
  );
}

export default Booking;
