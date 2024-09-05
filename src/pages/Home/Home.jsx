import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Logo from '../../assets/LOGOS/logoNegro.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Person1 from '../../assets/1.jpg';
import Person2 from '../../assets/2.jpg';
import Person3 from '../../assets/3.jpg';

const WhiteBanner = styled.div`
  width: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ColorBanner = styled.div`
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
  text-align: center;
`;

const BigProductSeet = styled.div`
  position: relative;
`;

const MyBigProduct = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;

  ${BigProductSeet}:hover & {
    opacity: 1;
  }
`;

function Home() {
  const navigate = useNavigate();
  const styleImages = [Person1, Person2, Person3];

  return (
    <>
      <WhiteBanner>
        <TextContainer>
          <h2>¿QUÉ ES E-LEARNING EXPERIENCE?</h2>
          <p>E-learning Experience es un evento de formación online y tecnología educativa, iniciado en 2016. Ha crecido en relevancia, incluyendo conferencias, talleres y networking. En 2024, ofrece entrevistas exclusivas One2One y el premio «Digit» para destacar las mejores iniciativas, con los ganadores anunciados en una cena especial.</p>
          <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/register')}>
            Regístrate
          </button>
        </TextContainer>
      </WhiteBanner>

      <WhiteBanner>
        <ColorBanner>
          <h2>Compra tus entradas</h2>
          <p>Conoce los diferentes tipos de entradas que tenemos disponibles</p>

          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            centerMode
            centerSlidePercentage={33.33}
            emulateTouch
            swipeable
          >
            {styleImages.map((item, index) => (
              <BigProductSeet key={index}>
                <MyBigProduct src={item} alt={`Persona ${index + 1}`} />
                <OverlayContainer>
                  <h2>Persona {index + 1}</h2>
                  <button>Ir a estilo</button>
                </OverlayContainer>
              </BigProductSeet>
            ))}
          </Carousel>

          <button className="blueButton">Quiero comprar mi entrada</button>

        </ColorBanner>
      </WhiteBanner>

      <WhiteBanner>
        <TextContainer>
          <p>Si todavía no tienes cuenta</p>
          <h2>no te lo pienses más</h2>
          <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/register')}>
            Regístrate
          </button>
        </TextContainer>
      </WhiteBanner>
    </>
  );
}

export default Home;
