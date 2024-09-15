// sin conectar y sin modal
// import { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import LoadingOverlay from '../../components/Spinner';
// import useApi from '../../hooks/useAPI';
// import styled from 'styled-components';

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

// const CalendarPage = () => {
//   const { data, getData, error, isLoading } = useApi();

//   useEffect(() => {
//     getData({ route: `partners/all` });
//   }, []);

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

//         {modalIsOpen && (
//           <div
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               zIndex: 1000,
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: 'white',
//                 borderRadius: '10px',
//                 padding: '30px',
//                 width: '400px',
//                 textAlign: 'center',
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <h2 style={{ fontFamily: 'Montserrat', fontSize: '1.5em' }}>Agendar un One2One</h2>
//                 <i
//                   className="bi bi-x-circle"
//                   onClick={closeModal}
//                   style={{ cursor: 'pointer' }}
//                 ></i>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '10px' }}>
//                   <label htmlFor="title">Título del Evento:</label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={formTitle}
//                     onChange={(e) => setFormTitle(e.target.value)}
//                     required
//                     style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                   <label htmlFor="date">Fecha del Evento:</label>
//                   <input
//                     type="date"
//                     id="date"
//                     value={formDate}
//                     onChange={(e) => setFormDate(e.target.value)}
//                     required
//                     style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                     min="2025-05-23"
//                     max="2025-05-24"
//                   />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                   <label htmlFor="timeStart">Hora de Inicio:</label>
//                   <input
//                     type="time"
//                     id="timeStart"
//                     value={formTimeStart}
//                     onChange={(e) => setFormTimeStart(e.target.value)}
//                     required
//                     style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                   />
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//                   Agregar Evento
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

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
//             end: '2025-05-25'
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




//eets bien pero no muestra la base de datos
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { useEffect, useState } from "react";
// import useApi from "../../hooks/useAPI";

// // Estilos del modal (fondo negro semitransparente y contenido centrado)
// const modalStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000, // Aumentar el z-index para que esté por encima de otros elementos
//   },
//   content: {
//     fontFamily: 'Montserrat',
//     padding: '30px',
//     borderRadius: '10px',
//     width: '400px',
//     textAlign: 'center', // Centrar el texto
//     backgroundColor: 'white', // Fondo blanco del modal
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     background: 'none',
//     border: 'none',
//     fontSize: '20px',
//     cursor: 'pointer',
//   },
// };

// const CalendarComponent = () => {
//   const { data, getData, error, isLoading } = useApi();
//   const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
//   const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

//   useEffect(() => {
//     getData({ route: 'partners/all' });
//   }, []);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setEvents(data[selectedPartnerIndex]?.agenda || []);
//     }
//   }, [data, selectedPartnerIndex]);

//   const openModal = (date) => {
//     setNewEvent((prev) => ({ ...prev, date }));
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (newEvent.title && newEvent.date && newEvent.time) {
//       const startTime = new Date(`${newEvent.date}T${newEvent.time}`);
//       const endTime = new Date(startTime);
//       endTime.setMinutes(startTime.getMinutes() + 30);

//       const eventToAdd = {
//         title: newEvent.title,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };
//       console.log('eventToAdd', eventToAdd)

//       // Actualiza el estado de eventos
//       setEvents([...events, eventToAdd]);

//       setNewEvent({ title: '', date: '', time: '' });
//       closeModal();
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//       <div style={{ marginBottom: '20px' }}>
//         {data && data.map((partner, index) => (
//           <button
//             key={partner.id}
//             onClick={() => setSelectedPartnerIndex(index)}
//             style={{
//               marginRight: '10px',
//               padding: '10px 15px',
//               backgroundColor: selectedPartnerIndex === index ? '#007bff' : '#ccc',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer'
//             }}>
//             {partner.name}
//           </button>
//         ))}
//       </div>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')}
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false,
//         }}
//         slotLabelClassNames="custom-slot-label"
//         validRange={{
//           start: '2025-05-23',
//           end: '2025-05-25',
//         }}
//         slotDuration="00:30:00"  // Define la duración de cada slot como 30 minutos
//         selectable={true}  // Permite seleccionar un rango
//         selectConstraint={{
//           start: "00:30:00",
//         }}  // Define que la duración mínima de los eventos sea de 30 minutos
//         headerToolbar={{
//           left: 'prev,next',
//           center: '',
//           right: ''
//         }}
//         dateClick={(info) => openModal(info.dateStr)}
//       />

//       {showModal && (
//         <div style={modalStyles.overlay}>
//           <div style={modalStyles.content}>
//             <button style={modalStyles.closeButton} onClick={closeModal}>×</button>
//             <h2>Agregar Evento</h2>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '10px' }}>
//                 <label htmlFor="title">Título del Evento:</label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={newEvent.title}
//                   onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                   required
//                   style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                 />
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <label htmlFor="date">Fecha del Evento:</label>
//                 <input
//                   type="date"
//                   id="date"
//                   value={newEvent.date}
//                   onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//                   required
//                   style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                   min="2025-05-23"
//                   max="2025-05-24"
//                 />
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <label htmlFor="time">Hora de Inicio:</label>
//                 <input
//                   type="time"
//                   id="time"
//                   value={newEvent.time}
//                   onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
//                   required
//                   style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//                 />
//               </div>
//               <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//                 Agregar Evento
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarComponent;