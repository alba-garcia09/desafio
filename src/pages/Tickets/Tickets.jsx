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
  padding: 0 20px;

  @media (max-width: 767px) {
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

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const AcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  border: 1.75px solid transparent;
  border-color: var(--primaryColor);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  color: var(--myBlack);
  justify-content: center;
  align-items: center;
  text-align: left;
  margin: 0 auto;

  @media (max-width: 767px) {
    padding: 15px;
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 767px) {
    width: 100%;
    padding: 0 5px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 10px;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const renderIncludes = (includes) => (
  <ul>
    {includes.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

function Tickets() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(1);

  const { data: publicTickets, getData: getPublicTickets, error: publicTicketsError, isLoading: publicTicketsLoading } = useApi();
  const { data: privateTickets, getData: getPrivateTickets, error: privateTicketsError, isLoading: privateTicketsLoading } = useApi();

  useEffect(() => {
    getPublicTickets({ route: `tickets/byType?type=public` });
    getPrivateTickets({ route: `tickets/byType?type=private` });
  }, []);

  const isLoading = publicTicketsLoading || privateTicketsLoading;
  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (publicTicketsError || privateTicketsError) {
    return <div>Error: {publicTicketsError?.message || privateTicketsError?.message}</div>;
  }

  const handleGroup1 = () => {
    setGroup(1);
  };

  const handleGroup2 = () => {
    setGroup(2);
  };

  const renderTickets = (tickets) => {
    return tickets.map((ticket, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>{ticket.title}</Accordion.Header>
        <Accordion.Body>
          <p><b>Descripción:</b> {ticket.description}</p>
          <p><b>Incluye:</b></p>
          {renderIncludes(ticket.includes)}
          <p><b>Precio:</b> {ticket.price}€</p>
          <button className="blueButton" onClick={() => navigate('/stripe')}>
            Comprar
          </button>
        </Accordion.Body>
      </Accordion.Item>
    ));
  };

  return (
    <>
    <Container>
    <WhiteBanner>
        <TextContainer>
          <h3>Selecciona el tipo de entrada</h3>
          <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
          <ul>
            <li>Welcome Pack del asistente</li>
            <li>Asistencia a ponencias y clases magistrales</li>
            <li>Coffee Break, comida, y cena cóctel y copa</li>
          </ul>
        </TextContainer>
      </WhiteBanner>

      <WhiteBanner>
        <ButtonContainer>
          <ButtonColumn className="col-8 col-lg-6">
            <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px' }}>
              Administración pública, entidades sin ánimo de lucro y educación
            </button>
          </ButtonColumn>
          <ButtonColumn className="col-4 col-lg-6">
            <button className='minimalButton' onClick={handleGroup2}>
              Empresas privadas
            </button>
          </ButtonColumn>
        </ButtonContainer>

        <AcordeonContainer>
          <Accordion defaultActiveKey="0">
            {group === 1 ? renderTickets(publicTickets || []) : renderTickets(privateTickets || [])}
          </Accordion>
        </AcordeonContainer>
      </WhiteBanner>
    </Container>

    </>
  );
}

export default Tickets;
