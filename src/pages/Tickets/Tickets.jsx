import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Accordion, Button } from 'react-bootstrap';

const WhiteBanner = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 20px;
`;

const AcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.75px solid transparent;
  border-color: var(--primaryColor);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  color: var(--myBlack);
  justify-content: center;
  align-items: center;
  text-align: left;
`;

function Tickets() {
  const navigate = useNavigate();
  return (
    <>
      <WhiteBanner>
        <TextContainer>
          <h3>Selecciona el tipo de entrada</h3>
          <p style={{color:'#6313F2'}}>Las entradas incluyen</p>
          <ul>
            <li>Welcome Pack del asistente</li>
            <li>Asistencia a ponencias y clases magistrales</li>
            <li>Coffee Break, comida, y cena cóctel y copa</li>
          </ul>
        </TextContainer>
      </WhiteBanner>

      <WhiteBanner>
      <AcordeonContainer>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Entrada 23 de mayo
            </Accordion.Header>
            <Accordion.Body>
              <p><b>Descripción:</b> Entrada para el evento del 23 de mayo. Incluye acceso completo a todas las actividades del día.</p>
              <p><b>Precio:</b> $50</p>
              <Button className="acordeonButton">
                Comprar
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Entrada 24 de mayo
            </Accordion.Header>
            <Accordion.Body>
              <p><b>Descripción:</b> Entrada para el evento del 24 de mayo. Incluye acceso completo a todas las actividades del día.</p>
              <p><b>Precio:</b> $60</p>
              <Button className="acordeonButton">
                Comprar
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Entrada completa
            </Accordion.Header>
            <Accordion.Body>
              <p><b>Descripción:</b> Entrada completa para ambos días del evento. Incluye todos los beneficios y actividades.</p>
              <p><b>Precio:</b> $100</p>
              <Button className="acordeonButton">
                Comprar
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Entrada online
            </Accordion.Header>
            <Accordion.Body>
              <p><b>Descripción:</b> Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.</p>
              <p><b>Precio:</b> $30</p>
              <Button className="acordeonButton">
                Comprar
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </AcordeonContainer>
      </WhiteBanner>
    </>
  );
}

export default Tickets;

