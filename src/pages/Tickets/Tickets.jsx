import React, { useState } from 'react';
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


const ButtonContainer=styled.div`
width: 97%;
display: flex;
flex-direction:row;
justify-content: center;
align-items: center;
text-align: center;
`;

const ButtonColumn=styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`;

function Tickets() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(1);

  const handleGroup1 = () => {
    setGroup(1);
  };

  const handleGroup2 = () => {
    setGroup(2);
  };

  return (
    <>
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
            {group === 1 && (
              <>
                <Accordion.Item eventKey="">
                  <Accordion.Header>
                    Entrada 23 de mayo
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada para el evento del 23 de mayo. Incluye acceso completo a todas las actividades del día.</p>
                    <p><b>Precio:</b> $50</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Entrada 24 de mayo
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada para el evento del 24 de mayo. Incluye acceso completo a todas las actividades del día.</p>
                    <p><b>Precio:</b> $60</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Entrada completa
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada completa para ambos días del evento. Incluye todos los beneficios y actividades.</p>
                    <p><b>Precio:</b> $100</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}

            {group === 2 && (
              <>
                  <Accordion.Item eventKey="">
                  <Accordion.Header>
                    Entrada online
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.</p>
                    <p><b>Precio:</b> $30</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Entrada VIP
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada VIP para ambos días del evento. Incluye acceso preferencial, sala VIP y otros beneficios exclusivos.</p>
                    <p><b>Precio:</b> $200</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    Entrada grupal
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><b>Descripción:</b> Entrada grupal para 5 personas. Incluye todos los beneficios del evento con un descuento especial por grupo.</p>
                    <p><b>Precio:</b> $400</p>
                    <button className="blueButton">
                      Comprar
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}
          </Accordion>
        </AcordeonContainer>
      </WhiteBanner>
    </>
  );
}

export default Tickets;
