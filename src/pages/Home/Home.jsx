import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import pcPhoto from '../../assets/pc.jpg';
import ponenciaPhoto from '../../assets/ponencia.jpg';
import speakingPhoto from '../../assets/speaking.jpg';
import Pentec from '../../assets/Pentec.jpg';
import Samoo from '../../assets/Samoo.jpg';
import OpenLMS from '../../assets/OpenLMS.jpg';
import ReadSpeaker from '../../assets/ReadSpeaker.jpg';

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
  align-items: center;
  text-align: center;
`;

const StylesBanner = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;

  @media (min-width: 768px) {
    padding: 40px 20px;
  }

  @media (min-width: 1024px) {
    padding: 0px 0px;
  }
`;

const BigProductSheet = styled.div`
  position: relative;
`;

const LogoSheet = styled.div`
  position: relative;
  padding: 0 10px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const MyBigProduct = styled.img`
  width: 100%;
`;

const ProductHeader = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 1024px) {
    height: 500px;
    object-fit: cover;
  }
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

  ${BigProductSheet}:hover & {
    opacity: 1;
  }
`;

const Card = styled.div`
  background-color: #F0F0F0;
  color: var(--myBlack);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.5em;
`;

const CardText = styled.p`
  font-size: 0.8em;
  margin: 30px 0;
`;

const ticketsData = [
  {
    title: 'Entrada día 1',
    description: 'Acceso completo al evento, incluye todas las ponencias y talleres.',
  },
  {
    title: 'Entrada día 2',
    description: 'Acceso completo al evento, incluye todas las ponencias y talleres.',
  },
  {
    title: 'Entrada Completa',
    description: 'Acceso a todas las áreas, incluyendo sesiones exclusivas y eventos VIP.',
  },
];

function Home() {
  const navigate = useNavigate();
  const styleImages = [
    { image: ponenciaPhoto , name: 'Conoce nuestro programa', url: '/program' },
    { image: speakingPhoto, name: 'Descubre eventos anteriores' , url: '/gallery'},
    { image: pcPhoto, name: 'Motivate con nuestros premios', url: '/prizes' }
  ];

  const logoImages = [
    { image: Pentec, name: 'Logo 1', url: 'https://www.pentec.es/' },
    { image: Samoo, name: 'Logo 2', url: 'https://www.samoo.es/' },
    { image: OpenLMS, name: 'Logo 3', url: 'https://www.openlms.net/es/' },
    { image: ReadSpeaker, name: 'Logo 4', url: 'https://www.readspeaker.com/es/' },
  ];

  const handleLogoClick = (url) => {
    window.location.href = url;
  };

  const handleStyleImageClick = (url) => {
    navigate(url);
  };

  return (
    <>
      <StylesBanner>
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay={true}
          centerMode
          centerSlidePercentage={100}
          emulateTouch
          swipeable
        >
          {styleImages.map((item, index) => (
            <BigProductSheet key={index}>
              <ProductHeader src={item.image} alt={item.name} />
              <OverlayContainer>
                <h2>{item.name}</h2>
                <button onClick={() => handleStyleImageClick(item.url)}>Acceder</button>
              </OverlayContainer>
            </BigProductSheet>
          ))}
        </Carousel>
      </StylesBanner>

      <Container>
        <WhiteBanner style={{paddingTop:'4em',paddingBottom:'4em', }}>
          <TextContainer>
            <h1>¿QUÉ ES E-LEARNING EXPERIENCE?</h1>
            <p className="littleText">E-learning Experience es un evento de formación online y tecnología educativa, iniciado en 2016. Ha crecido en relevancia, incluyendo conferencias, talleres y networking. En 2024, ofrece entrevistas exclusivas One2One y el premio «Digit» para destacar las mejores iniciativas, con los ganadores anunciados en una cena especial.</p>
            <button className="blackButton" onClick={() => navigate('/login')}>
              Accede a tu perfil
            </button>
          </TextContainer>
        </WhiteBanner>

        <WhiteBanner>
          <ColorBanner>
            <TextContainer>
              <h3>Conoce los diferentes tipos de entradas disponibles</h3>

              <StylesBanner>
                <Carousel
                  showArrows={false}
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay={true}
                  centerMode
                  centerSlidePercentage={60}
                  emulateTouch
                  swipeable
                >
                  {ticketsData.map((ticket, index) => (
                    <LogoSheet key={index}>
                      <Card>
                        <CardTitle>{ticket.title}</CardTitle>
                        <CardText>{ticket.description}</CardText>
                      </Card>
                    </LogoSheet>
                  ))}
                </Carousel>
              </StylesBanner>

              <p className="littleText" style={{ color: '#6313F2' }}>Las entradas incluyen</p>
              <ul>
                <li>Welcome Pack del asistente</li>
                <li>Asistencia a ponencias y clases magistrales</li>
                <li>Coffee Break, comida, y cena cóctel y copa</li>
              </ul>

              <button className="blueButton" onClick={() => navigate('/tickets')}>Quiero comprar mi entrada</button>

            </TextContainer>
          </ColorBanner>
        </WhiteBanner>

        <StylesBanner style={{paddingTop:'5em', paddingBottom: '5em'}}>
          <TextCentered>
            <h2>Nuestros partners</h2>
          </TextCentered>
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay={true}
            centerMode
            centerSlidePercentage={50}
            emulateTouch
            swipeable
          >
            {logoImages.map((item, index) => (
              <LogoSheet key={index}>
                <MyBigProduct src={item.image} alt={item.name} />
                <OverlayContainer>
                  <h2>{item.name}</h2>
                  <button onClick={() => handleLogoClick(item.url)}>Ir al sitio</button>
                </OverlayContainer>
              </LogoSheet>
            ))}
          </Carousel>
        </StylesBanner>

      </Container>
    </>
  );
}

export default Home;
