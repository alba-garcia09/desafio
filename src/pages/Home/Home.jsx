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


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Logo from '../../assets/LOGOS/logoNegro.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import Person1 from '../../assets/1.jpg'
// import Person2 from '../../assets/2.jpg'
// import Person3 from '../../assets/3.jpg'

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
// `;



// const ColorBanner = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;

//   border:1.75px solid transparent;
//   border-color:var(--primaryColor);
//   padding: 0.3em 0.6em;
//   border-radius: 10px !important;

//   background-color:white ;
//   color:var(--myBlack) ;

//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 10px;
// `;

// function Home() {
//   const navigate = useNavigate();
// const styleImages=[Person1, Person2, Person3]

//   return (
//     <>
//       <WhiteBanner>
//         <TextContainer>
//           <h2>¿QUÉ ES E-LEARNING EXPERIENCE?</h2>
//           <p>E-learning Experience es un evento de formación online y tecnología educativa, iniciado en 2016. Ha crecido en relevancia, incluyendo conferencias, talleres y networking. En 2024, ofrece entrevistas exclusivas One2One y el premio «Digit» para destacar las mejores iniciativas, con los ganadores anunciados en una cena especial.</p>
//           <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/register')}>
//             Regístrate
//           </button>
//         </TextContainer>
//       </WhiteBanner>

//       <WhiteBanner>
//         <ColorBanner>

//           <h2>Compra tus entradas</h2>
//           <p>Conoce los diferentes tipos de entradas que tenemos disponibles</p>

//           <Carousel
//             showArrows={false}
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             useKeyboardArrows
//             autoPlay={true}
//             centerMode
//             centerSlidePercentage={33.33}
//             emulateTouch
//             swipeable
//           >
//             {styleImages.map((item, index) => (
//               <BigProductSeet key={index}>
//                 <MyBigProduct src={item.image} alt={item.name} />
//                 <OverlayContainer>
//                   <h2>{item.name}</h2>
//                   <button>Ir a estilo</button>
//                 </OverlayContainer>
//               </BigProductSeet>
//             ))}
//           </Carousel>

//           <button className="blueButton">Quiero comprar mi entrada</button>

//         </ColorBanner>

//       </WhiteBanner>

//       <WhiteBanner>
//         <TextContainer>
//           <p>Si todavía no tienes cuenta</p>
//           <h2>no te lo pienses más</h2>
//           <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/register')}>
//             Regístrate
//           </button>
//         </TextContainer>
//       </WhiteBanner>
//     </>
//   )

// }

// export default Home;





// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Logo from '../../assets/LOGOS/logoNegro.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// const ColorBanner = styled.div`
//   width: 100%;
//   background-color: var(--secundaryColor);
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 10px;
// `;

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 50px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StylesBanner = styled.div`
//   width: 100%;
//   background-color: white;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const NewsBanner = styled.div`
//   width: 100%;
//   background-color: black;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 10px;
// `;

// const CheapestClothesBanner = styled.div`
//   width: 100%;
//   background-color: white;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 50px 200px;
// `;

// const InspirationBanner = styled.div`
//   width: 100%;
//   background-color: black;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 10px 500px;

//   @media (max-width: 768px) {
//     padding: 10px 20px;
//   }

//   @media (max-width: 480px) {
//     padding: 10px 10px;
//   }
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   margin-bottom: 10px;
// `;

// const MyLogo = styled.img`
//   height: auto;
//   width: 200px;

//   @media (max-width: 768px) {
//     width: 150px;
//   }

//   @media (max-width: 480px) {
//     width: 100px;
//   }
// `;

// const MyProduct = styled.img`
//   height: auto;
//   width: 100%;
//   border-radius: 20px;
//   margin-bottom: 30px;
//   cursor: pointer;
// `;

// const MyBigProduct = styled.img`
//   height: auto;
//   width: 100%;
// `;

// const ProductSeet = styled.div`
//   height: auto;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
// `;

// const OverlayContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   background-color: rgba(0, 0, 0, 0.5);
//   opacity: 0;
//   transition: opacity 0.3s ease-in-out;

//   h2 {
//     margin-bottom: 20px;
//   }
// `;

// const BigProductSeet = styled.div`
//   height: auto;
//   width: 100%;
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:hover ${OverlayContainer} {
//     opacity: 1;
//   }
// `;

// const ResponsiveCarousel = styled(Carousel)`
//   @media (max-width: 768px) {
//     .carousel .slide {
//       display: flex;
//       justify-content: center;
//     }
//   }
// `;

// const ProductsBanner = styled.div`
// width: 100%;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// padding: 50px;
// `;


// function Home() {
//   const navigate = useNavigate();

//   const styleImages = [
//     { name: 'Streetwear', image: Streetwear },
//     { name: 'Elegant', image: Elegant },
//     { name: 'Sporty', image: Sporty },
//     { name: 'Summer', image: Summer },
//     { name: 'Basic', image: Basic },
//     { name: 'Trendy', image: Trendy },
//   ];

//   useEffect(() => {
//     getLastClothes({ route: `clothes/lastClothes` });
//     getCheapestClothes({ route: `clothes/cheapestClothes` });
//     getAllClothes({ route: `clothes/all` });
//   }, []);

//   const isLoading = lastClothesLoading || cheapestClothesLoading || allClothesLoading;
//   if (isLoading) {
//     return <LoadingOverlay isLoading={true} message="Cargando datos..." />;
//   }


//   if (lastClothesError || cheapestClothesError || allClothesError) {
//     return <div>Error: {lastClothesError?.message || cheapestClothesError?.message || allClothesError?.message}</div>;
//   }

//   const handleProductClick = (id) => {
//     navigate(`/productDetail/${id}`);
//   };

//   const handleSpotifyClick = () => {
//     window.location.href = 'https://open.spotify.com/playlist/37i9dQZEVXbNFJfN1Vw8d9';
//   };


//   const allTypesArray = [];

//   if (allClothes && Array.isArray(allClothes)) {
//     const allTypes = allClothes.map((item) => item.type);

//     allTypes.forEach((type) => {
//       if (!allTypesArray.includes(type)) {
//         allTypesArray.push(type);
//       }
//     });
//   }

//   return (
//     <>
//       <StylesBanner>
//         <Carousel
//           showArrows={false}
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           useKeyboardArrows
//           autoPlay={true}
//           centerMode
//           centerSlidePercentage={33.33}
//           emulateTouch
//           swipeable
//         >
//           {styleImages.map((item, index) => (
//             <BigProductSeet key={index}>
//               <MyBigProduct src={item.image} alt={item.name} />
//               <OverlayContainer>
//                 <h2>{item.name}</h2>
//                 <button>Ir a estilo</button>
//               </OverlayContainer>
//             </BigProductSeet>
//           ))}
//         </Carousel>
//       </StylesBanner>

//       <WhiteBanner>
//         <TextContainer>
//           <h2>Adelántate a las últimas tendencias y ofertas exclusivas</h2>
//           <p>Suscríbete ahora y recibe lo último en moda y consejos directo a tu email.</p>
//           <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/?')}>
//             Suscríbete
//           </button>
//         </TextContainer>
//       </WhiteBanner>

//       <NewsBanner>
//         <h1>Novedades</h1>
//         <Carousel
//           showArrows={false}
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           useKeyboardArrows
//           autoPlay={true}
//           centerMode
//           centerSlidePercentage={33.33}
//           emulateTouch
//           swipeable
//         >
//           {lastClothes && lastClothes.map((item, index) => (
//             item.image && item.image[0] && (
//               <ProductSeet key={index} onClick={() => handleProductClick(item._id)}>
//                 <MyProduct src={item.image[0]} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.price}€</p>
//               </ProductSeet>
//             )
//           ))}
//         </Carousel>
//       </NewsBanner>

//       <ColorBanner>
//         <TextContainer>
//           <p>Hasta un</p>
//           <h2>20% de descuento</h2>
//         </TextContainer>
//       </ColorBanner>

//       <CheapestClothesBanner>
//         <LogoContainer>
//           <h1>Nuestras gangas</h1>
//         </LogoContainer>
//         <Carousel
//           showArrows={false}
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           useKeyboardArrows
//           autoPlay={true}
//           centerMode
//           centerSlidePercentage={33.33}
//           emulateTouch
//           swipeable
//         >
//           {cheapestClothes && cheapestClothes.map((item, index) => (
//             item.image && item.image[1] && (
//               <ProductSeet key={index} onClick={() => handleProductClick(item._id)}>
//                 <MyProduct src={item.image[1]} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p style={{ color: 'red' }}>{item.price}€</p>
//               </ProductSeet>
//             )
//           ))}
//         </Carousel>
//       </CheapestClothesBanner>

//       <ColorBanner>
//         <TextContainer>
//           <p>Hemos creado una lista para ti</p>
//           <button className="blackButton" onClick={handleSpotifyClick}>Accede a nuestra lista</button>
//         </TextContainer>
//       </ColorBanner>

//       <ProductsBanner>
//         <h1>Nuestros productos</h1>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           {allTypesArray.map((type, index) => (
//             <p onClick={() => navigate(`/products?type=${type}`)} key={index} style={{ margin: '5px 0' }}>
//               {type}
//             </p>
//           ))}

//         </div>
//         <button style={{ margin: '20px 0px 0px 0px' }} className="blackButton" onClick={() => navigate('/products')}>Quiero conocerlos todos</button>
//         <></>
//       </ProductsBanner>

//       <InspirationBanner>
//         <LogoContainer>
//           <MyLogo src={Logo} alt="Logo" />
//           <h1>community</h1>
//         </LogoContainer>
//         <Carousel
//           showArrows={false}
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           useKeyboardArrows
//           autoPlay={true}
//           centerMode
//           centerSlidePercentage={33.33}
//           emulateTouch
//           swipeable
//         >
//           {cheapestClothes && cheapestClothes.map((item, index) => (
//             item.image && item.image[1] && (
//               <ProductSeet key={index}>
//                 <MyProduct src={item.image[1]} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.price}€</p>
//               </ProductSeet>
//             )
//           ))}
//         </Carousel>
//         <p>¡Inspírate y comparte tus looks Alpal utilizando el hashtag #alpalcommunity y mencionando @alpal!</p>
//       </InspirationBanner>

//       <WhiteBanner>
//         <TextContainer>
//           <p>Si todavía no tienes cuenta</p>
//           <h2>no te lo pienses más</h2>
//           <button className="blackButton" style={{ margin: '20px' }} onClick={() => navigate('/register')}>
//             Regístrate
//           </button>
//         </TextContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Home;