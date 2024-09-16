import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Accordion, Button } from 'react-bootstrap';
import useApi from '../../hooks/useAPI.js';
import LoadingOverlay from '../../components/Spinner.jsx';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const WhiteBanner = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const AcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: transparent;
  color: var(--myBlack) !important;
  justify-content: center;
  align-items: center;
  text-align: left;
  border-top: 1.75px solid var(--primaryColor);
  font-size: 0.9em;

  .accordion-item {
    border: none;
    margin-bottom: 10px;
    font-size: 0.9em;
  }

  .accordion-button {
    border: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
    font-size: 0.9em;
  }

  .accordion-button:active,
  .accordion-button:focus {
    border: none !important;
    box-shadow: none !important;
    background-color: var(--myBlack);
    font-size: 0.9em;
  }

  .accordion-button:not(.collapsed) {
    background-color: transparent !important;
    color: var(--primaryColor) !important;
    font-size: 0.9em;
  }

  .accordion-body {
    border-top: none !important;
    padding: 20px;
    font-size: 0.9em;
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: top;
    width: 100%;
    padding: 10px;
    border-bottom: 1.5px solid var(--primaryColor);
    background-color: transparent;
    color: var(--myBlack) !important;
    transition: background-color 0.3s, color 0.3s;
    font-size: 0.9em;
  }

  .accordion-header:hover
  .accordion-button:active,
  .accordion-button:focus {
    background-color: transparent;
    color: var(--primaryColor) !important;
    font-size: 0.9em;
  }
`;



const ButtonContainer = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  font-size: 1em;
  padding: 10px 20px;
  border: 2px solid var(--primaryColor);
  background-color: ${({ active }) => (active ? 'var(--primaryColor)' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'var(--primaryColor)')};
  cursor: pointer;
`;

function Tickets() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(1);

  const { data: dayOne, getData: getDayOne, error: dayOneError, isLoading: dayOneLoading } = useApi();
  const { data: dayTwo, getData: getDayTwo, error: dayTwoError, isLoading: dayTwoLoading } = useApi();

  useEffect(() => {
    getDayOne({ route: `workshops/byDay?day=1` });
    getDayTwo({ route: `workshops/byDay?day=2` });
  }, []);

  console.log('dayOne', dayOne)
  console.log('dayTwo', dayTwo)

  const isLoading = dayOneLoading || dayTwoLoading;
  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (dayOneError || dayTwoError) {
    return <div>Error: {dayOneError?.message || dayTwoError?.message}</div>;
  }

  const handleGroup1 = () => {
    setGroup(1);
  };

  const handleGroup2 = () => {
    setGroup(2);
  };

  const renderTickets = (workshops) => {
    return workshops.map((workshop, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>
          {/* Contenedor principal con display: flex para alinear ambos elementos en la misma línea */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>

            {/* Contenedor del workshop.time (alineado a la izquierda) */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <p className="programButton" style={{ margin: 0, fontWeight: 'bold', paddingRight: '10px' }}>{workshop.time}</p>
            </div>

            {/* Contenedor del workshop.type y título (alineados a la derecha) */}
            <div style={{ flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {workshop.type && (
                <p className="programButton" style={{ marginBottom: '1em' }}>
                  <i className="bi bi-circle-fill" style={{ fontSize: 5, color: 'var(--primaryColor)', marginRight: '1em' }}></i> {workshop.type}
                </p>
              )}
              <p className="programButton" style={{ margin: 0, paddingRight: '10px' }}>
                {workshop.title}
              </p>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {workshop.description && (
            <p style={{ color: 'var(--primaryColor)' }}>
              <b>Descripción:</b> {workshop.description}
            </p>
          )}

          {workshop.speaker && (
            <p style={{ color: 'var(--primaryColor)' }}>
              <b>Speaker:</b> {workshop.speaker}
            </p>
          )}

          {workshop.duration && (
            <p style={{ color: 'var(--primaryColor)' }}>
              <i className="bi bi-stopwatch" style={{ paddingRight: '1em' }}></i>{workshop.duration}
            </p>
          )}
        </Accordion.Body>
      </Accordion.Item>
    ));
  };

  return (
    <>
      <Container>
        <WhiteBanner>

          <ButtonContainer>
            <ButtonColumn className="col-6 col-lg-6">
              <StyledButton className='minimalButton' active={group === 1} onClick={handleGroup1}>
                23 de mayo
              </StyledButton>
            </ButtonColumn>
            <ButtonColumn className="col-6 col-lg-6">
              <StyledButton className='minimalButton' active={group === 2} onClick={handleGroup2}>
                24 de mayo
              </StyledButton>
            </ButtonColumn>
          </ButtonContainer>


          <AcordeonContainer>
            <Accordion defaultActiveKey="0">
              {group === 1 && dayOne && renderTickets(dayOne)}
              {group === 2 && dayTwo && renderTickets(dayTwo)}

            </Accordion>
          </AcordeonContainer>
        </WhiteBanner>
      </Container>

    </>
  );
}

export default Tickets;
