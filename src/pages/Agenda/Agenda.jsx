import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// Estilos del modal (fondo negro semitransparente y contenido centrado)
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Aumentar el z-index para que esté por encima de otros elementos
  },
  content: {
    fontFamily:'Montserrat',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center', // Centrar el texto
    backgroundColor: 'white', // Fondo blanco del modal
  },
};

const CalendarPage = () => {
  const [eventsPerson1, setEventsPerson1] = useState([
    {
      title: 'Evento de prueba Persona 1',
      start: '2025-05-23T10:00:00',
      end: '2025-05-23T10:30:00',
    },
  ]);

  const [eventsPerson2, setEventsPerson2] = useState([
    {
      title: 'Evento de prueba Persona 2',
      start: '2025-05-24T14:00:00',
      end: '2025-05-24T14:30:00',
    },
  ]);

  const [selectedPerson, setSelectedPerson] = useState('person1');
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTimeStart, setFormTimeStart] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Variable para almacenar datos del evento
  const [savedEvent, setSavedEvent] = useState(null);

  const openModal = (date) => {
    // Comprobación de que la fecha sea válida para abrir el modal
    if (date >= '2025-05-23' && date <= '2025-05-24') {
      setFormDate(date);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formTitle && formDate && formTimeStart) {
      // Calcular la hora de finalización (30 minutos después de la hora de inicio)
      const startTime = new Date(`${formDate}T${formTimeStart}`);
      const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

      const newEvent = {
        title: formTitle,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      };

      // Guardar el evento en el estado
      setSavedEvent(newEvent);

      if (selectedPerson === 'person1') {
        setEventsPerson1([...eventsPerson1, newEvent]);
      } else {
        setEventsPerson2([...eventsPerson2, newEvent]);
      }

      setFormTitle('');
      setFormDate('');
      setFormTimeStart('');
      closeModal();
    }
  };

  const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

  return (
    <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
      <h1>Mi Calendario</h1>

      {/* Selector de persona */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="radio"
            name="person"
            value="person1"
            checked={selectedPerson === 'person1'}
            onChange={() => setSelectedPerson('person1')}
          />
          Persona 1
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            name="person"
            value="person2"
            checked={selectedPerson === 'person2'}
            onChange={() => setSelectedPerson('person2')}
          />
          Persona 2
        </label>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Agregar Evento"
      >
        <div style={{display:'flex', flexDirection:'row'}}>
          <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
          <i
            className="bi bi-x-circle col-2 col-lg-2"
            onClick={closeModal}
            style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft:'2.5em' }}
          ></i>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="title">Título del Evento:</label>
            <input
              type="text"
              id="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="date">Fecha del Evento:</label>
            <input
              type="date"
              id="date"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              min="2025-05-23"
              max="2025-05-24"
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="timeStart">Hora de Inicio:</label>
            <input
              type="time"
              id="timeStart"
              value={formTimeStart}
              onChange={(e) => setFormTimeStart(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
            Agregar Evento
          </button>
        </form>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={events}
        eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
        slotMinTime="09:00:00"
        slotMaxTime="19:00:00"
        allDaySlot={false}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // Formato 24 horas
        }}
        slotLabelClassNames="custom-slot-label" // Estilo personalizado
        dateClick={(info) => openModal(info.dateStr)}
        validRange={{
          start: '2025-05-23',
          end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
        }}
        headerToolbar={{
          left: 'prev,next',
          center: '',
          right: ''
        }}
      />

      {/* Mostrar el evento guardado */}
      {savedEvent && (
        <div style={{ marginTop: '20px' }}>
          <h3>Evento Guardado:</h3>
          <p><strong>Título:</strong> {savedEvent.title}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(savedEvent.start).toLocaleString()}</p>
          <p><strong>Fecha de Fin:</strong> {new Date(savedEvent.end).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;






// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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

//   const openModal = (date) => {
//     // Comprobación de que la fecha sea válida para abrir el modal
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
//       // Calcular la hora de finalización (30 minutos después de la hora de inicio)
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

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
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <div style={{display:'flex', flexDirection:'row'}}>
//           <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
//           <i
//             className="bi bi-x-circle col-2 col-lg-2"
//             onClick={closeModal}
//             style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft:'2.5em' }}
//           ></i>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               min="2025-05-23"
//               max="2025-05-24"
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false, // Formato 24 horas
//         }}
//         slotLabelClassNames="custom-slot-label" // Estilo personalizado
//         dateClick={(info) => openModal(info.dateStr)}
//         validRange={{
//           start: '2025-05-23',
//           end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
//         }}
//         headerToolbar={{
//           left: 'prev,next',
//           center: '',
//           right: ''
//         }}
//       />



//     </div>
//   );
// };

// export default CalendarPage;






// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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

//   const openModal = (date) => {
//     // Comprobación de que la fecha sea válida para abrir el modal
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
//       // Calcular la hora de finalización (30 minutos después de la hora de inicio)
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

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
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <div style={{display:'flex', flexDirection:'row'}}>
//           <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
//           <i
//             className="bi bi-x-circle col-2 col-lg-2"
//             onClick={closeModal}
//             style={{ display: 'flex', marginTop: '10px', paddingBottom: '1.9em', paddingLeft:'2.5em' }}
//           ></i>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               min="2025-05-23"
//               max="2025-05-24"
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false, // Formato 24 horas
//         }}
//         slotLabelClassNames="custom-slot-label" // Estilo personalizado
//         dateClick={(info) => openModal(info.dateStr)}
//         validRange={{
//           start: '2025-05-23',
//           end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
//         }}
//         headerToolbar={{
//           left: 'prev,next',
//           center: '',
//           right: ''
//         }}
//       />


//     </div>
//   );
// };

// export default CalendarPage;




// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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

//   const openModal = (date) => {
//     if (date === '2025-05-23' || date === '2025-05-24') {
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
//       // Calcular la hora de finalización (30 minutos después de la hora de inicio)
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

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
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <div style={{display:'flex', flexDirection:'row'}}>
//           <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
//           <i
//             className="bi bi-x-circle col-2 col-lg-2"
//             onClick={closeModal}
//             style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft:'2.5em' }}
//           ></i>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               min="2025-05-23"
//               max="2025-05-24"
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false, // Formato 24 horas
//         }}
//         slotLabelClassNames="custom-slot-label" // Estilo personalizado
//         dateClick={(info) => openModal(info.dateStr)}
//         validRange={{
//           start: '2025-05-23',
//           end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
//         }}
//         headerToolbar={{
//           left: 'prev,next',
//           center: '',
//           right: ''
//         }}
//       />

//       <style>
//         {`
//           .fc-prev-button, .fc-next-button {
//             background-color: red; /* Color rojo para los botones */
//             color: white; /* Texto blanco */
//             border: none; /* Sin borde */
//           }
//           .fc-prev-button:hover, .fc-next-button:hover {
//             background-color: darkred; /* Color rojo oscuro al pasar el mouse */
//           }
//           .fc-toolbar-title {
//             display: none; /* Ocultar el título del calendario */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default CalendarPage;






// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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

//   const openModal = (date) => {
//     if (date === '2025-05-23' || date === '2025-05-24') {
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
//       // Calcular la hora de finalización (30 minutos después de la hora de inicio)
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

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
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <div style={{display:'flex', flexDirection:'row'}}>
//           <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
//           <i
//             className="bi bi-x-circle col-2 col-lg-2"
//             onClick={closeModal}
//             style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft:'2.5em' }}
//           ></i>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//               min="2025-05-23"
//               max="2025-05-24"
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false, // Formato 24 horas
//         }}
//         slotLabelClassNames="custom-slot-label" // Estilo personalizado
//         dateClick={(info) => openModal(info.dateStr)}
//         validRange={{
//           start: '2025-05-23',
//           end: '2025-05-25' // Excluir el 25 de mayo de 2025, ya que solo se deben mostrar hasta el 24
//         }}
//       />
//     </div>
//   );
// };

// export default CalendarPage;


// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00',
//       end: '2024-09-15T10:30:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T14:30:00',
//     },
//   ]);

//   const [selectedPerson, setSelectedPerson] = useState('person1');
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = (date) => {
//     setFormDate(date);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       // Calcular la hora de finalización (30 minutos después de la hora de inicio)
//       const startTime = new Date(`${formDate}T${formTimeStart}`);
//       const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutos en milisegundos

//       const newEvent = {
//         title: formTitle,
//         start: startTime.toISOString(),
//         end: endTime.toISOString(),
//       };

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
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <div style={{display:'flex', flexDirection:'row'}}>
//           <h2 className="col-10 col-lg-10" style={{ marginBottom: '20px', fontFamily:'Montserrat', fontSize:'1.5em'}}>Agendar un One2One</h2>
//             <i
//               className="bi bi-x-circle col-2 col-lg-2"
//               onClick={closeModal}
//               style={{ display: 'flex', marginTop: '10px', paddingBottom: '50px', paddingLeft:'2.5em' }}
//             ></i>
//         </div>


//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')} // Corregido
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false, // Formato 24 horas
//         }}
//         slotLabelClassNames="custom-slot-label" // Estilo personalizado
//         dateClick={(info) => openModal(info.dateStr)}
//       />
//     </div>
//   );
// };

// export default CalendarPage;





// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

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
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00',
//       end: '2024-09-15T12:00:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T15:00:00',
//     },
//   ]);

//   const [selectedPerson, setSelectedPerson] = useState('person1');
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [formTimeEnd, setFormTimeEnd] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = (date) => {
//     setFormDate(date);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const newEvent = {
//         title: formTitle,
//         start: `${formDate}T${formTimeStart}`,
//         end: formTimeEnd ? `${formDate}T${formTimeEnd}` : null,
//       };

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       setFormTimeEnd('');
//       closeModal();
//     }
//   };

//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <h2 style={{ marginBottom: '20px' }}>Agregar Evento</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeEnd">Hora de Fin (opcional):</label>
//             <input
//               type="time"
//               id="timeEnd"
//               value={formTimeEnd}
//               onChange={(e) => setFormTimeEnd(e.target.value)}
//               style={{ width: '100%', padding: '8px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//         <button onClick={closeModal} style={{ marginTop: '10px', padding: '10px 20px' }}>
//           Cerrar
//         </button>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor="{var(--primaryColor);}"
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         dateClick={(info) => openModal(info.dateStr)}
//       />
//     </div>
//   );
// };

// export default CalendarPage;




// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// // Estilos del modal (fondo negro semitransparente y contenido centrado)
// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
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
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00',
//       end: '2024-09-15T12:00:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T15:00:00',
//     },
//   ]);

//   const [selectedPerson, setSelectedPerson] = useState('person1');
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [formTimeEnd, setFormTimeEnd] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = (date) => {
//     setFormDate(date);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const newEvent = {
//         title: formTitle,
//         start: `${formDate}T${formTimeStart}`,
//         end: formTimeEnd ? `${formDate}T${formTimeEnd}` : null,
//       };

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       setFormTimeEnd('');
//       closeModal();
//     }
//   };

//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <h2 style={{ marginBottom: '20px' }}>Agregar Evento</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeEnd">Hora de Fin (opcional):</label>
//             <input
//               type="time"
//               id="timeEnd"
//               value={formTimeEnd}
//               onChange={(e) => setFormTimeEnd(e.target.value)}
//               style={{ width: '100%', padding: '8px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//         <button onClick={closeModal} style={{ marginTop: '10px', padding: '10px 20px' }}>
//           Cerrar
//         </button>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor="#ff9f00"
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         dateClick={(info) => openModal(info.dateStr)}
//       />
//     </div>
//   );
// };

// export default CalendarPage;



// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// // Estilos del modal (fondo negro semitransparente y contenido centrado)
// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
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
//   },
// };

// const CalendarPage = () => {
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00',
//       end: '2024-09-15T12:00:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T15:00:00',
//     },
//   ]);

//   const [selectedPerson, setSelectedPerson] = useState('person1');
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [formTimeEnd, setFormTimeEnd] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = (date) => {
//     setFormDate(date);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const newEvent = {
//         title: formTitle,
//         start: `${formDate}T${formTimeStart}`,
//         end: formTimeEnd ? `${formDate}T${formTimeEnd}` : null,
//       };

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       setFormTimeEnd('');
//       closeModal();
//     }
//   };

//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <h2 style={{ marginBottom: '20px' }}>Agregar Evento</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeEnd">Hora de Fin (opcional):</label>
//             <input
//               type="time"
//               id="timeEnd"
//               value={formTimeEnd}
//               onChange={(e) => setFormTimeEnd(e.target.value)}
//               style={{ width: '100%', padding: '8px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
//             Agregar Evento
//           </button>
//         </form>
//         <button onClick={closeModal} style={{ marginTop: '10px', padding: '10px 20px' }}>
//           Cerrar
//         </button>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor="#ff9f00"
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         dateClick={(info) => openModal(info.dateStr)}
//       />
//     </div>
//   );
// };

// export default CalendarPage;




// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// // Estilos del modal (puedes ajustarlos según tus necesidades)
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// const CalendarPage = () => {
//   // Estado para los eventos de cada persona
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00',
//       end: '2024-09-15T12:00:00',
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T15:00:00',
//     },
//   ]);

//   // Estado para la persona seleccionada
//   const [selectedPerson, setSelectedPerson] = useState('person1');

//   // Estado para el formulario
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [formTimeEnd, setFormTimeEnd] = useState('');

//   // Estado para el modal
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   // Abrir el modal y rellenar la fecha automáticamente
//   const openModal = (date) => {
//     setFormDate(date); // Poner la fecha seleccionada en el formulario
//     setModalIsOpen(true);
//   };

//   // Cerrar el modal
//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   // Maneja el envío del formulario
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const newEvent = {
//         title: formTitle,
//         start: `${formDate}T${formTimeStart}`,
//         end: formTimeEnd ? `${formDate}T${formTimeEnd}` : null,
//       };

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       // Limpiar el formulario y cerrar el modal
//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       setFormTimeEnd('');
//       closeModal();
//     }
//   };

//   // Seleccionar los eventos basados en la persona seleccionada
//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       {/* Modal para agregar eventos */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Agregar Evento"
//       >
//         <h2>Agregar Evento</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="title">Título del Evento:</label>
//             <input
//               type="text"
//               id="title"
//               value={formTitle}
//               onChange={(e) => setFormTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="date">Fecha del Evento:</label>
//             <input
//               type="date"
//               id="date"
//               value={formDate}
//               onChange={(e) => setFormDate(e.target.value)}
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeStart">Hora de Inicio:</label>
//             <input
//               type="time"
//               id="timeStart"
//               value={formTimeStart}
//               onChange={(e) => setFormTimeStart(e.target.value)}
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label htmlFor="timeEnd">Hora de Fin (opcional):</label>
//             <input
//               type="time"
//               id="timeEnd"
//               value={formTimeEnd}
//               onChange={(e) => setFormTimeEnd(e.target.value)}
//             />
//           </div>
//           <button type="submit">Agregar Evento</button>
//         </form>
//         <button onClick={closeModal}>Cerrar</button>
//       </Modal>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridDay"
//         events={events}
//         eventColor="#ff9f00"
//         slotMinTime="09:00:00"
//         slotMaxTime="19:00:00"
//         allDaySlot={false}
//         dateClick={(info) => openModal(info.dateStr)} // Abrir modal al hacer clic en una fecha
//       />
//     </div>
//   );
// };

// export default CalendarPage;


// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin para mostrar horas
// import interactionPlugin from '@fullcalendar/interaction'; // Para interacciones

// const CalendarPage = () => {
//   // Estado para los eventos de cada persona
//   const [eventsPerson1, setEventsPerson1] = useState([
//     {
//       title: 'Evento de prueba Persona 1',
//       start: '2024-09-15T10:00:00', // Formato con hora
//       end: '2024-09-15T12:00:00', // Hora final opcional
//     },
//   ]);

//   const [eventsPerson2, setEventsPerson2] = useState([
//     {
//       title: 'Evento de prueba Persona 2',
//       start: '2024-09-16T14:00:00',
//       end: '2024-09-16T15:00:00',
//     },
//   ]);

//   // Estado para la persona seleccionada
//   const [selectedPerson, setSelectedPerson] = useState('person1');

//   // Estado para el formulario
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');
//   const [formTimeStart, setFormTimeStart] = useState('');
//   const [formTimeEnd, setFormTimeEnd] = useState('');

//   // Maneja el envío del formulario
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate && formTimeStart) {
//       const newEvent = {
//         title: formTitle,
//         start: `${formDate}T${formTimeStart}`,
//         end: formTimeEnd ? `${formDate}T${formTimeEnd}` : null, // End es opcional
//       };

//       if (selectedPerson === 'person1') {
//         setEventsPerson1([...eventsPerson1, newEvent]);
//       } else {
//         setEventsPerson2([...eventsPerson2, newEvent]);
//       }

//       // Limpiar el formulario
//       setFormTitle('');
//       setFormDate('');
//       setFormTimeStart('');
//       setFormTimeEnd('');
//     }
//   };

//   // Seleccionar los eventos basados en la persona seleccionada
//   const events = selectedPerson === 'person1' ? eventsPerson1 : eventsPerson2;

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       {/* Selector de persona */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           <input
//             type="radio"
//             name="person"
//             value="person1"
//             checked={selectedPerson === 'person1'}
//             onChange={() => setSelectedPerson('person1')}
//           />
//           Persona 1
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           <input
//             type="radio"
//             name="person"
//             value="person2"
//             checked={selectedPerson === 'person2'}
//             onChange={() => setSelectedPerson('person2')}
//           />
//           Persona 2
//         </label>
//       </div>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="title">Título del Evento:</label>
//           <input
//             type="text"
//             id="title"
//             value={formTitle}
//             onChange={(e) => setFormTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="date">Fecha del Evento:</label>
//           <input
//             type="date"
//             id="date"
//             value={formDate}
//             onChange={(e) => setFormDate(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="timeStart">Hora de Inicio:</label>
//           <input
//             type="time"
//             id="timeStart"
//             value={formTimeStart}
//             onChange={(e) => setFormTimeStart(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="timeEnd">Hora de Fin (opcional):</label>
//           <input
//             type="time"
//             id="timeEnd"
//             value={formTimeEnd}
//             onChange={(e) => setFormTimeEnd(e.target.value)}
//           />
//         </div>
//         <button type="submit">Agregar Evento</button>
//       </form>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Añadido timeGridPlugin
//         initialView="timeGridDay" // Vista de día con horas
//         events={events}
//         eventColor="#ff9f00" // Color para los eventos
//         slotMinTime="09:00:00" // Hora mínima que se muestra
//         slotMaxTime="19:00:00" // Hora máxima que se muestra
//         allDaySlot={false} // Elimina el slot "All Day"
//       />
//     </div>
//   );
// };

// export default CalendarPage;



// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction'; // Para interacciones

// const CalendarPage = () => {
//   // Estado para los eventos
//   const [events, setEvents] = useState([
//     {
//       title: 'Evento de prueba',
//       date: '2024-09-15', // Cambia esta fecha según tus necesidades
//     },
//   ]);

//   // Estado para el formulario
//   const [formTitle, setFormTitle] = useState('');
//   const [formDate, setFormDate] = useState('');

//   // Maneja el envío del formulario
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (formTitle && formDate) {
//       // Añadir el nuevo evento al estado
//       setEvents([
//         ...events,
//         {
//           title: formTitle,
//           date: formDate,
//         },
//       ]);

//       // Limpiar el formulario
//       setFormTitle('');
//       setFormDate('');
//     }
//   };

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="title">Título del Evento:</label>
//           <input
//             type="text"
//             id="title"
//             value={formTitle}
//             onChange={(e) => setFormTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="date">Fecha del Evento:</label>
//           <input
//             type="date"
//             id="date"
//             value={formDate}
//             onChange={(e) => setFormDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Agregar Evento</button>
//       </form>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventColor="#ff9f00" // Color para los eventos
//       />
//     </div>
//   );
// };

// export default CalendarPage;



// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';

// const Agenda = () => {
//   const events = [
//     {
//       title: 'Evento de prueba',
//       date: '2024-09-15', // Cambia esta fecha según tus necesidades
//     },
//   ];

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '900px', padding: '40px' }}>
//       <h1>Mi Calendario</h1>
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventColor="#ff9f00" // Color para los eventos
//       />
//     </div>
//   );
// };

// export default Agenda;
