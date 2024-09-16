import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useAPI.js';
import LoadingOverlay from '../../components/Spinner.jsx';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top:2em;
  box-sizing: border-box;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Text = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom:2em;
  text-align:left;
  justify-content:left;
  align-content:left;

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

function Accommodation() {
  const navigate = useNavigate();

  const { data, getData, error, isLoading } = useApi();

  useEffect(() => {
    getData({ route: 'accommodation/all' });
  }, []);

  if (data && data.length) {
    console.log('data ', data);
  }

  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (error) {
    return <div>Error: {error.message} </div>;
  }

  return (
    <>
      <Container>
        <Partners>
          <Text style={{paddinngBottom: '3em'}}>
            <h1>Encuentra alojamiento</h1>
            <p >¿Necesitas alojamiento para el evento? Hemos negociado descuentos especiales en hoteles cercanos para los asistentes. Selecciona tu hotel, usa el código de descuento al reservar y disfruta de tarifas exclusivas, con la comodidad de estar a pocos minutos del evento.</p>
          </Text>


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
              item.image && item.name && item.price && item.discount && (
                <ProductSeet key={index}>
                  <div className="col-12 col-lg-6">
                    <MyProduct src={item.image} alt={item.name} />
                  </div>

                  <Text style={{ paddingLeft: '3em', paddingRight: '3em', textAlign: 'left' }} className="col-12 col-lg-6">
                    <h2>{item.name}</h2>
                    <p style={{ color: 'var(--primaryColor)' }}>{item.neighborhood}</p>
                    <h3 >{item.price}€</h3>
                    <p className='littleText'>{item.discount}</p>
                    <button onClick={() => navigate('/booking')} >Go to Booking</button>
                  </Text>
                </ProductSeet>
              )
            ))}
          </Carousel>
        </Partners>
      </Container>
    </>
  );
}

export default Accommodation;
