import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useAPI.js';
import LoadingOverlay from '../../components/Spinner.jsx';
import CalendarComponent from '../../components/Calendar.jsx';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Partners = styled.div`
  width: 100%;
  color: 'var(--myBlack)' ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 10px;
`;

const ProductSeet = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
  }
`;


const MyProduct = styled.img`
  height: auto;
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
`;


function Agenda() {
  const navigate = useNavigate();
  const { data, getData, error, isLoading } = useApi();

  useEffect(() => {
    getData({ route: 'partners/all' });
    console.log('data', data)
  }, []);


  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  const handleClick = (url) => {
    if (url) {
      window.location.href = url;
    } else {
      console.error('Invalid URL');
    }
  };

  return (
    <>
      <Container>
        <Partners>
          <h1>One2Ones</h1>
          <p className='littleText'>En nuestro evento educativo, tendrás la oportunidad de participar en sesiones "one to one"
            con expertos en el campo. Estas reuniones privadas te permitirán obtener asesoramiento personalizado
            y respuestas específicas a tus preguntas, asegurando una experiencia de aprendizaje adaptada
            a tus necesidades. Aprovecha esta oportunidad para profundizar en temas de tu interés y recibir orientación directa de profesionales destacados.</p>

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
            {data && Array.isArray(data) && data.map((item, index) => (
              item.image && item.name && item.description && (

                <ProductSeet key={index} >
                  <div className="col-12 col-lg-6">
                    <MyProduct src={item.image} alt={item.name} />
                  </div>

                  <div style={{ paddingLeft: '3em', paddingRight:'3em', textAlign:'left'}} className="col-12 col-lg-6" >
                    <h3>{item.name}</h3>
                    <p style={{ color: 'var(--primaryColor)' }}>{item.charge}</p>
                    <p className='littleText'>{item.description}</p>
                    <button onClick={() => handleClick(item.linkedin)}>Linkedin</button>
                  </div>
                </ProductSeet>
              )
            ))}
          </Carousel>
        </Partners>


      </Container>
<CalendarComponent></CalendarComponent>
    </>
  );
}

export default Agenda;
