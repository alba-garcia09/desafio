import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from "react";
import useApi from "../hooks/useAPI";

// Estilos del modal (fondo negro semitransparente y contenido centrado)
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro semitransparente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Aumentar el z-index para que esté por encima de otros elementos
  },
  content: {
    fontFamily: 'Montserrat',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center', // Centrar el texto
    backgroundColor: 'white', // Fondo blanco del modal
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

const CalendarComponent = () => {
  const { data, getData, error, isLoading } = useApi();
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    getData({ route: 'partners/all' });
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setEvents(data[selectedPartnerIndex].agenda || []);
    }
  }, [data, selectedPartnerIndex]);

  const openModal = (date) => {
    setNewEvent((prev) => ({ ...prev, date }));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setApiError('');

    // Crear el objeto de evento con las fechas formateadas
    const start = new Date(`${newEvent.date}T${newEvent.time}`).toISOString();
    const end = new Date(new Date(`${newEvent.date}T${newEvent.time}`).getTime() + 30 * 60000).toISOString();
    console.log('end***********', end)

    try {
      await getData({
        route: 'meetings/schedule',
        method: 'POST',
        body: {
          partnerId: data[selectedPartnerIndex]._id,
          clientId: '66e476153c38d9f1bdbad3aa',//hasta que no se pueda otra cosa
          start: start,
          end: end,
        },
      });
    } catch (err) {
      setApiError(err.message);
    }
  };


  const handleSubmit = (event) => {
    console.log(event); // Agrega esta línea para depurar
    event.preventDefault();

    if (newEvent.title && newEvent.date && newEvent.time) {
      const startTime = new Date(`${newEvent.date}T${newEvent.time}`);
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 30);

      const eventToAdd = {
        title: newEvent.title,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      };
      console.log('eventToAdd', eventToAdd);

      // Actualiza el estado de eventos
      setEvents([...events, eventToAdd]);

      // Enviar a la base de datos
      handlePost();

      setNewEvent({ title: '', date: '', time: '' });
      closeModal();
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ marginBottom: '20px' }}>
        {data && data.map((partner, index) => (
          <button
            key={partner.id}
            onClick={() => setSelectedPartnerIndex(index)}
            style={{
              marginRight: '10px',
              padding: '10px 15px',
              backgroundColor: selectedPartnerIndex === index ? '#007bff' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
            {partner.name}
          </button>
        ))}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={events}
        eventColor={getComputedStyle(document.documentElement).getPropertyValue('--primaryColor')}
        slotMinTime="09:00:00"
        slotMaxTime="19:00:00"
        allDaySlot={false}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        slotLabelClassNames="custom-slot-label"
        validRange={{
          start: '2025-05-23',
          end: '2025-05-25',
        }}
        slotDuration="00:30:00"  // Define la duración de cada slot como 30 minutos
        selectable={true}  // Permite seleccionar un rango
        selectConstraint={{
          start: "00:30:00",
        }}  // Define que la duración mínima de los eventos sea de 30 minutos
        headerToolbar={{
          left: 'prev,next',
          center: '',
          right: ''
        }}
        dateClick={(info) => openModal(info.dateStr)}
      />

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button style={modalStyles.closeButton} onClick={closeModal}>×</button>
            <h2>Agregar Evento</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="title">Título del Evento:</label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="date">Fecha del Evento:</label>
                <input
                  type="date"
                  id="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                  min="2025-05-23"
                  max="2025-05-24"
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="time">Hora de Inicio:</label>
                <input
                  type="time"
                  id="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
                Agregar Evento
              </button>
            </form>
            {apiError && <div style={{ color: 'red', marginTop: '10px' }}>{apiError}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
