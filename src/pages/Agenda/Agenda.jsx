import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const WhiteBanner = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction:column;
  justify-content: left;
  align-items: left;
  text-align: center;
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const TextCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ColorBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.75px solid transparent;
  border-color: var(--primaryColor);
  padding: 10px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 10px;
  background-color: white;
  color: var(--myBlack);
  justify-content: center;
  align-items: flex-start;
  text-align: left;
`;

const data = [
  {
    title: 'Premio a la mejor iniciativa en contenidos',
    1: 'Air Nostrum',
    2: 'Unie',
    3: 'Umivale Activa'
  },
  {
    title: 'Premio OpenLMS al mejor ecosistema de aprendizaje',
    1: 'Unia',
    2: 'Sescam',
    3: 'Comillas'
  },
  {
    title: 'Premio a la mejor experiencia de usuario',
    1: 'ASM',
    2: 'EALDE',
    3: 'Comillas'
  },
  {
    title: 'Premio al mejor servicio al cliente',
    1: 'Smowl',
    2: 'Compilatio',
    3: 'Anthology'
  },
  {
    title: 'Premio al impacto social y comunitario',
    1: 'ReadSpeaker',
    2: 'Bemyvega',
    3: 'Anthology'
  },
  {
    title: 'Premio a la innovación',
    1: 'Zoom',
    2: 'LViS',
    3: 'Optimum Assesment'
  },
  {
    title: 'Premio al proveedor del año',
    1: 'OpenLMS',
    2: 'iSpring',
    3: 'ReadSpeaker'
  },
];

function Prizes() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <WhiteBanner>
          <TextContainer>
            <h1>Premios Digit E-learning</h1>
            <p style={{ color: 'var(--primaryColor)' }}>
              Celebrando la Innovación en el aprendizaje digital
            </p>
            <p className="littleText">
              ¡Es momento de celebrar el aprendizaje digital en su máxima expresión!
              Desde Samoo – Elearning by PENTEC estamos muy contentos de compartir que en
              la sexta edición de E-learning Experience 24, nuestro encuentro presencial
              insignia, daremos un paso adelante al otorgar los Premios Digit E-learning.
            </p>
          </TextContainer>
        </WhiteBanner>

        <WhiteBanner>
          <ColorBanner style={{ padding: '20px' }}>
            <h3>Conoce las categorias</h3>
            <p className="littleText">Con categorías que abarcan desde la innovación y el impacto social
              hasta el servicio al cliente y la experiencia de usuario, celebraremos
              a los líderes que están transformando el e-learning. ¡Prepárate para conocer a los mejores</p>
            <Accordion defaultActiveKey="0">
              {data.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    {item.title}
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {[1, 2, 3].map(key => (
                        <li key={key}>{item[key]}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </ColorBanner>
        </WhiteBanner>

        <WhiteBanner style={{paddingTop:'30px', paddingBottom:'50px' }}>
          <TextCentered>
            <h2>Regístrate</h2>
            <p className="littleText">
              y enterate de todas las novedades
            </p>
            <button className="blackButton" onClick={() => navigate('/register')}>
              Regístrate
            </button>
          </TextCentered>
        </WhiteBanner>
      </Container>
    </>
  );
}

export default Prizes;