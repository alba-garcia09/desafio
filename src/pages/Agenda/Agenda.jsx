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







//este esta muy bien
// import { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import useApi from '../../hooks/useAPI.js';
// import LoadingOverlay from '../../components/Spinner.jsx';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// const Container = styled.div`
//   width: 100%;
//   max-width: 1000px;
//   margin: 0 auto;
//   padding: 0 20px;
//   box-sizing: border-box;

//   @media (max-width: 767px) {
//     max-width: 100%;
//     padding: 0 10px;
//   }
// `;

// const Partners = styled.div`
//   width: 100%;
//   color: 'var(--myBlack)' ;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   text-align: left;
//   padding: 10px;
// `;

// const ProductSeet = styled.div`
//   height: auto;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
//   box-sizing: border-box;

//   @media (max-width: 767px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;


// const MyProduct = styled.img`
//   height: auto;
//   max-width: 100%;
//   border-radius: 10px;
//   margin-bottom: 30px;
//   cursor: pointer;
// `;


// function Agenda() {
//   const navigate = useNavigate();
//   const { data, getData, error, isLoading } = useApi();

//   useEffect(() => {
//     getData({ route: 'partners/all' });
//   }, []);


//   if (isLoading) {
//     return <LoadingOverlay isLoading={true} />;
//   }

//   if (error) {
//     return <div>Error: {error?.message}</div>;
//   }

//   const handleClick = (url) => {
//     if (url) {
//       window.location.href = url;
//     } else {
//       console.error('Invalid URL');
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Partners>
//           <h1>One2Ones</h1>
//           <p className='littleText'>En nuestro evento educativo, tendrás la oportunidad de participar en sesiones "one to one"
//             con expertos en el campo. Estas reuniones privadas te permitirán obtener asesoramiento personalizado
//             y respuestas específicas a tus preguntas, asegurando una experiencia de aprendizaje adaptada
//             a tus necesidades. Aprovecha esta oportunidad para profundizar en temas de tu interés y recibir orientación directa de profesionales destacados.</p>

//           <Carousel
//             showArrows={false}
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             useKeyboardArrows
//             autoPlay={true}
//             centerMode
//             centerSlidePercentage={100}
//             emulateTouch
//             swipeable
//           >
//             {data && Array.isArray(data) && data.map((item, index) => (
//               item.image && item.name && item.description && (

//                 <ProductSeet key={index} >
//                   <div className="col-12 col-lg-6">
//                     <MyProduct src={item.image} alt={item.name} />
//                   </div>

//                   <div style={{ paddingLeft: '3em', paddingRight:'3em', textAlign:'left'}} className="col-12 col-lg-6" >
//                     <h3>{item.name}</h3>
//                     <p style={{ color: 'var(--primaryColor)' }}>{item.charge}</p>
//                     <p className='littleText'>{item.description}</p>
//                     <button onClick={() => handleClick(item.linkedin)}>Linkedin</button>
//                   </div>
//                 </ProductSeet>
//               )
//             ))}
//           </Carousel>
//         </Partners>


//       </Container>

//     </>
//   );
// }

// export default Agenda;





// import { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal
// import LoadingOverlay from '../../components/Spinner';
// import useApi from '../../hooks/useAPI';
// import styled from 'styled-components';
// import { Carousel } from 'react-responsive-carousel';

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

// const MyProduct = styled.img`
//   height: auto;
//   width: 100%;
//   border-radius: 20px;
//   margin-bottom: 30px;
//   cursor: pointer;
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


// // Estilos del modal (fondo negro semitransparente y contenido centrado)
// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000, // Aumentar el z-index para que esté por encima de otros elementos
//   },
//   content: {
//     fontFamily: 'Montserrat',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     padding: '30px',
//     borderRadius: '10px',
//     width: '400px',
//     textAlign: 'center', // Centrar el texto
//     backgroundColor: 'white', // Fondo blanco del modal
//   },

// };

// const CalendarPage = () => {
//   const { data, getData, error, isLoading } = useApi();

//   useEffect(() => {
//     getData({ route: 'partners' });
//   }, [getData]);

//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2025-05-23T10:00:00',
//       end: '2025-05-23T10:30:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2025-05-24T14:00:00',
//       end: '2025-05-24T14:30:00',
//     },
//   ]);

//   // Resto del código...


//   const [selectedPerson, setSelectedPerson] = useState('person1');
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const [savedEvent, setSavedEvent] = useState(null);

//   const openModal = (date) => {
//     if (date >= '2025-05-23' && date <= '2025-05-24') {
//       setFormDate(date);
//       setModalIsOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

//       // Guardar el evento en el estado
//       setSavedEvent(newEvent);

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       closeModal();
//     }
//   };

//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <>
//       {isLoading && <LoadingOverlay isLoading={true} />}
//       {error && <div>{error}</div>}
//       <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//         <h1>Mi Calendario</h1>

//         <NewsBanner>
//         <h1>Nuestros partners</h1>
//         <Carousel
//           showArrows={false}
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           useKeyboardArrows
//           autoPlay={true}
//           centerMode
//           centerSlidePercentage={50}
//           emulateTouch
//           swipeable
//         >
//           {data && data.map((item, index) => (
//             item.image && item.image[0] && (
//               <ProductSeet key={index}>
//                 <MyProduct src={item.image} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.description}</p>
//               </ProductSeet>
//             )
//           ))}
//         </Carousel>
//       </NewsBanner>


//         <div style={{ marginBottom: '20px' }}>
//           <label>
//             <input
//               type="radio"
//               name="person"
//               value="person1"
//               checked={selectedPerson === 'person1'}
//               onChange={() => setSelectedPerson('person1')}
//             />
//             Persona 1
//           </label>
//           <label style={{ marginLeft: '10px' }}>
//             <input
//               type="radio"
//               name="person"
//               value="person2"
//               checked={selectedPerson === 'person2'}
//               onChange={() => setSelectedPerson('person2')}
//             />
//             Persona 2
//           </label>
//         </div>

//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           style={customStyles}
//           contentLabel="Agregar Evento"
//         >
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily: 'Montserrat', fontSize: '1.5em' }}>Agendar un One2One</h2>
//             <i
//               className="bi bi-x-circle col-2 col-lg-2"
//               onClick={closeModal}
//               style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft: '2.5em' }}
//             ></i>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div style={{ marginBottom: '10px' }}>
//               <label htmlFor="title">Título del Evento:</label>
//               <input
//                 type="text"
//                 id="title"
//                 value={formTitle}
//                 onChange={(e) => setFormTitle(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               />
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <label htmlFor="date">Fecha del Evento:</label>
//               <input
//                 type="date"
//                 id="date"
//                 value={formDate}
//                 onChange={(e) => setFormDate(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                 min="2025-05-23"
//                 max="2025-05-24"
//               />
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <label htmlFor="timeStart">Hora de Inicio:</label>
//               <input
//                 type="time"
//                 id="timeStart"
//                 value={formTimeStart}
//                 onChange={(e) => setFormTimeStart(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               />
//             </div>
//             <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//               Agregar Evento
//             </button>
//           </form>
//         </Modal>

//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="timeGridDay"
//           events={events}
//           eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//           slotMinTime="09:00:00"
//           slotMaxTime="19:00:00"
//           allDaySlot={false}
//           slotLabelFormat={{
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false, // Formato 24 horas
//           }}
//           slotLabelClassNames="custom-slot-label" // Estilo personalizado
//           dateClick={(info) => openModal(info.dateStr)}
//           validRange={{
//             start: '2025-05-23',
//             end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
//           }}
//           headerToolbar={{
//             left: 'prev,next',
//             center: '',
//             right: ''
//           }}
//         />

//         {savedEvent && (
//           <div style={{ marginTop: '20px' }}>
//             <h3>Evento Guardado:</h3>
//             <p><strong>Título:</strong> {savedEvent.title}</p>
//             <p><strong>Fecha de Inicio:</strong> {new Date(savedEvent.start).toLocaleString()}</p>
//             <p><strong>Fecha de Fin:</strong> {new Date(savedEvent.end).toLocaleString()}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CalendarPage;



