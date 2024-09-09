import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Accordion, Button, Spinner, Alert } from 'react-bootstrap';
import usetApi from '../../hooks/connectAPI'; // Asegúrate de que la ruta sea correcta
import LoadingOverlay from '../../components/Spinner'; // Verifica si este componente existe

const WhiteBanner = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 20px;
`;

const AcordeonContainer = styled.div`
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
  text-align: left;
`;

const ButtonContainer = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Función para renderizar los detalles de "includes"
const renderIncludes = (includes) => (
  <ul>
    {includes.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

function Tickets() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(1); // 1 para administración pública, 2 para empresas privadas
  const { data, getData, error, isLoading } = usetApi(); // Usa el hook personalizado

  useEffect(() => {
    getData({ route: `tickets/all` });
  }, []);

  const handleGroup1 = () => {
    setGroup(1);
  };

  const handleGroup2 = () => {
    setGroup(2);
  };

  // Filtrar las entradas basadas en el grupo seleccionado
  const filteredTickets = data
    ? data.filter(ticket =>
        group === 1 ? ticket.type.includes("public") : ticket.type.includes("private")
      )
    : [];

  // Renderizar entradas dinámicamente basado en el grupo seleccionado
  const renderTickets = (tickets) => {
    return tickets.map((ticket, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>{ticket.title}</Accordion.Header>
        <Accordion.Body>
          <p><b>Descripción:</b> {ticket.description}</p>
          <p><b>Incluye:</b></p>
          {renderIncludes(ticket.includes)}
          <p><b>Precio:</b> ${ticket.price}</p>
          <button className="blueButton">
            Comprar
          </button>
        </Accordion.Body>
      </Accordion.Item>
    ));
  };

  if (isLoading) {
    return <LoadingOverlay/>; // O usa LoadingOverlay si prefieres
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <WhiteBanner>
        <TextContainer>
          <h3>Selecciona el tipo de entrada</h3>
          <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
          <ul>
            <li>Welcome Pack del asistente</li>
            <li>Asistencia a ponencias y clases magistrales</li>
            <li>Coffee Break, comida, y cena cóctel y copa</li>
          </ul>
        </TextContainer>
      </WhiteBanner>

      <WhiteBanner>
        <ButtonContainer>
          <ButtonColumn className="col-8 col-lg-6">
            <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px' }}>
              Administración pública, entidades sin ánimo de lucro y educación
            </button>
          </ButtonColumn>
          <ButtonColumn className="col-4 col-lg-6">
            <button className='minimalButton' onClick={handleGroup2}>
              Empresas privadas
            </button>
          </ButtonColumn>
        </ButtonContainer>

        <AcordeonContainer>
          <Accordion defaultActiveKey="0">
            {renderTickets(filteredTickets)}
          </Accordion>
        </AcordeonContainer>
      </WhiteBanner>
    </>
  );
}

export default Tickets;




//el previo a usar la base de datos
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
// import { Accordion, Button } from 'react-bootstrap';

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   text-align: left;
//   margin-bottom: 20px;
// `;

// const AcordeonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   border: 1.75px solid transparent;
//   border-color: var(--primaryColor);
//   padding: 10px;
//   border-radius: 10px;
//   background-color: white;
//   color: var(--myBlack);
//   justify-content: center;
//   align-items: center;
//   text-align: left;
// `;

// const ButtonContainer = styled.div`
//   width: 97%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const ButtonColumn = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// // Arrays separados para los dos grupos de entradas
// const PUBLIC_ENTRIES = [
//   {
//     title: "Entrada 23 de mayo",
//     description: "Entrada de 1 día para la administración pública, entidades sin ánimo de lucro y educación",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante el día 23 de Mayo.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (1), comida (1), cena, cocktail y copas",
//     ],
//     price: 150,
//   },
//   {
//     title: "Entrada completa",
//     description: "Entrada completa para ambos días del evento",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante ambos días del evento.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (2), comidas (2), cenas, cocktail y copas",
//     ],
//     price: 350,
//   },
// ];

// const PRIVATE_ENTRIES = [
//   {
//     title: "Entrada 24 de mayo",
//     description: "Entrada de 1 día para empresas privadas",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante el día 24 de Mayo.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (1), comida (1), cena, cocktail y copas",
//     ],
//     price: 200,
//   },
//   {
//     title: "Entrada VIP",
//     description: "Entrada VIP para ambos días, con acceso preferencial",
//     includes: [
//       "Acceso preferencial a ponencias y clases magistrales durante ambos días.",
//       "Welcome Pack exclusivo",
//       "Acceso a la sala VIP y beneficios adicionales",
//     ],
//     price: 500,
//   },
// ];

// // Función para renderizar los detalles de "includes"
// const renderIncludes = (includes) => (
//   <ul>
//     {includes.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// );

// function Tickets() {
//   const navigate = useNavigate();
//   const [group, setGroup] = useState(1); // 1 para administración pública, 2 para empresas privadas

//   const handleGroup1 = () => {
//     setGroup(1);
//   };

//   const handleGroup2 = () => {
//     setGroup(2);
//   };

//   // Renderizar entradas dinámicamente basado en el grupo seleccionado
//   const renderTickets = (tickets) => {
//     return tickets.map((ticket, index) => (
//       <Accordion.Item eventKey={index.toString()} key={index}>
//         <Accordion.Header>{ticket.title}</Accordion.Header>
//         <Accordion.Body>
//           <p><b>Descripción:</b> {ticket.description}</p>
//           <p><b>Incluye:</b></p>
//           {renderIncludes(ticket.includes)}
//           <p><b>Precio:</b> ${ticket.price}</p>
//           <button className="blueButton">
//             Comprar
//           </button>
//         </Accordion.Body>
//       </Accordion.Item>
//     ));
//   };

//   return (
//     <>
//       <WhiteBanner>
//         <TextContainer>
//           <h3>Selecciona el tipo de entrada</h3>
//           <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
//           <ul>
//             <li>Welcome Pack del asistente</li>
//             <li>Asistencia a ponencias y clases magistrales</li>
//             <li>Coffee Break, comida, y cena cóctel y copa</li>
//           </ul>
//         </TextContainer>
//       </WhiteBanner>

//       <WhiteBanner>
//         <ButtonContainer>
//           <ButtonColumn className="col-8 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px' }}>
//               Administración pública, entidades sin ánimo de lucro y educación
//             </button>
//           </ButtonColumn>
//           <ButtonColumn className="col-4 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup2}>
//               Empresas privadas
//             </button>
//           </ButtonColumn>
//         </ButtonContainer>

//         <AcordeonContainer>
//           <Accordion defaultActiveKey="0">
//             {group === 1 ? renderTickets(PUBLIC_ENTRIES) : renderTickets(PRIVATE_ENTRIES)}
//           </Accordion>
//         </AcordeonContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Tickets;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
// import { Accordion, Button } from 'react-bootstrap';

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   text-align: left;
//   margin-bottom: 20px;
// `;

// const AcordeonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   border: 1.75px solid transparent;
//   border-color: var(--primaryColor);
//   padding: 10px;
//   border-radius: 10px;
//   background-color: white;
//   color: var(--myBlack);
//   justify-content: center;
//   align-items: center;
//   text-align: left;
// `;

// const ButtonContainer = styled.div`
//   width: 97%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const ButtonColumn = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// // Array de entradas adaptado a la estructura de datos dada
// const TICKET_DATA = [
//   {
//     title: "Entrada 23 de mayo",
//     description: "Entrada de 1 día para la administración pública, entidades sin ánimo de lucro y educación",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante el día 23 de Mayo.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (1), comida (1), cena, cocktail y copas",
//     ],
//     price: 150,
//     type: ["public", "administración pública, entidades sin ánimo de lucro y educación"],
//   },
//   {
//     title: "Entrada 24 de mayo",
//     description: "Entrada de 1 día para empresas privadas",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante el día 24 de Mayo.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (1), comida (1), cena, cocktail y copas",
//     ],
//     price: 200,
//     type: ["private", "empresas privadas"],
//   },
//   {
//     title: "Entrada completa",
//     description: "Entrada completa para ambos días del evento",
//     includes: [
//       "Asistencia a ponencias y clases magistrales durante ambos días del evento.",
//       "Welcome Pack del Asistente",
//       "Coffee Break (2), comidas (2), cenas, cocktail y copas",
//     ],
//     price: 350,
//     type: ["public", "administración pública, entidades sin ánimo de lucro y educación"],
//   },
//   {
//     title: "Entrada VIP",
//     description: "Entrada VIP para ambos días, con acceso preferencial",
//     includes: [
//       "Acceso preferencial a ponencias y clases magistrales durante ambos días.",
//       "Welcome Pack exclusivo",
//       "Acceso a la sala VIP y beneficios adicionales",
//     ],
//     price: 500,
//     type: ["private", "VIP", "empresas privadas"],
//   },
// ];

// // Función para renderizar los detalles de "includes"
// const renderIncludes = (includes) => (
//   <ul>
//     {includes.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// );

// function Tickets() {
//   const navigate = useNavigate();
//   const [group, setGroup] = useState("public"); // Cambiado a string para simplificar

//   const handleGroup = (selectedGroup) => {
//     setGroup(selectedGroup);
//   };

//   // Renderizar entradas dinámicamente basado en el grupo seleccionado
//   const renderTickets = (tickets) => {
//     return tickets
//       .filter((ticket) => ticket.type.includes(group))
//       .map((ticket, index) => (
//         <Accordion.Item eventKey={index.toString()} key={index}>
//           <Accordion.Header>{ticket.title}</Accordion.Header>
//           <Accordion.Body>
//             <p><b>Descripción:</b> {ticket.description}</p>
//             <p><b>Incluye:</b></p>
//             {renderIncludes(ticket.includes)}
//             <p><b>Precio:</b> ${ticket.price}</p>
//             <button className="blueButton">
//               Comprar
//             </button>
//           </Accordion.Body>
//         </Accordion.Item>
//       ));
//   };

//   return (
//     <>
//       <WhiteBanner>
//         <TextContainer>
//           <h3>Selecciona el tipo de entrada</h3>
//           <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
//           <ul>
//             <li>Welcome Pack del asistente</li>
//             <li>Asistencia a ponencias y clases magistrales</li>
//             <li>Coffee Break, comida, y cena cóctel y copa</li>
//           </ul>
//         </TextContainer>
//       </WhiteBanner>

//       <WhiteBanner>
//         <ButtonContainer>
//           <ButtonColumn className="col-8 col-lg-6">
//             <button className='minimalButton' onClick={() => handleGroup("public")} style={{ marginRight: '10px' }}>
//               Administración pública, entidades sin ánimo de lucro y educación
//             </button>
//           </ButtonColumn>
//           <ButtonColumn className="col-4 col-lg-6">
//             <button className='minimalButton' onClick={() => handleGroup("private")}>
//               Empresas privadas
//             </button>
//           </ButtonColumn>
//         </ButtonContainer>

//         <AcordeonContainer>
//           <Accordion defaultActiveKey="0">
//             {renderTickets(TICKET_DATA)}
//           </Accordion>
//         </AcordeonContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Tickets;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
// import { Accordion, Button } from 'react-bootstrap';

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   text-align: left;
//   margin-bottom: 20px;
// `;

// const AcordeonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   border: 1.75px solid transparent;
//   border-color: var(--primaryColor);
//   padding: 10px;
//   border-radius: 10px;
//   background-color: white;
//   color: var(--myBlack);
//   justify-content: center;
//   align-items: center;
//   text-align: left;
// `;

// const ButtonContainer = styled.div`
//   width: 97%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const ButtonColumn = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const TICKET_DATA = {
//   group1: [
//     {
//       id: 0,
//       title: 'Entrada 23 de mayo',
//       description: 'Entrada para el evento del 23 de mayo. Incluye acceso completo a todas las actividades del día.',
//       price: '$50',
//     },
//     {
//       id: 1,
//       title: 'Entrada 24 de mayo',
//       description: 'Entrada para el evento del 24 de mayo. Incluye acceso completo a todas las actividades del día.',
//       price: '$60',
//     },
//     {
//       id: 2,
//       title: 'Entrada completa',
//       description: 'Entrada completa para ambos días del evento. Incluye todos los beneficios y actividades.',
//       price: '$100',
//     },
//   ],
//   group2: [
//     {
//       id: 3,
//       title: 'Entrada online',
//       description: 'Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.',
//       price: '$30',
//     },
//     {
//       id: 4,
//       title: 'Entrada VIP',
//       description: 'Entrada VIP para ambos días del evento. Incluye acceso preferencial, sala VIP y otros beneficios exclusivos.',
//       price: '$200',
//     },
//     {
//       id: 5,
//       title: 'Entrada grupal',
//       description: 'Entrada grupal para 5 personas. Incluye todos los beneficios del evento con un descuento especial por grupo.',
//       price: '$400',
//     },
//   ],
// };

// function Tickets() {
//   const navigate = useNavigate();
//   const [group, setGroup] = useState(1);

//   const handleGroup1 = () => {
//     setGroup(1);
//   };

//   const handleGroup2 = () => {
//     setGroup(2);
//   };

//   const renderTickets = (tickets) => {
//     return tickets.map((ticket) => (
//       <Accordion.Item eventKey={ticket.id.toString()} key={ticket.id}>
//         <Accordion.Header>{ticket.title}</Accordion.Header>
//         <Accordion.Body>
//           <p><b>Descripción:</b> {ticket.description}</p>
//           <p><b>Precio:</b> {ticket.price}</p>
//           <button className="blueButton">
//             Comprar
//           </button>
//         </Accordion.Body>
//       </Accordion.Item>
//     ));
//   };

//   return (
//     <>
//       <WhiteBanner>
//         <TextContainer>
//           <h3>Selecciona el tipo de entrada</h3>
//           <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
//           <ul>
//             <li>Welcome Pack del asistente</li>
//             <li>Asistencia a ponencias y clases magistrales</li>
//             <li>Coffee Break, comida, y cena cóctel y copa</li>
//           </ul>
//         </TextContainer>
//       </WhiteBanner>

//       <WhiteBanner>
//         <ButtonContainer>
//           <ButtonColumn className="col-8 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px' }}>
//               Administración pública, entidades sin ánimo de lucro y educación
//             </button>
//           </ButtonColumn>
//           <ButtonColumn className="col-4 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup2}>
//               Empresas privadas
//             </button>
//           </ButtonColumn>
//         </ButtonContainer>

//         <AcordeonContainer>
//           <Accordion defaultActiveKey="0">
//             {group === 1 ? renderTickets(TICKET_DATA.group1) : renderTickets(TICKET_DATA.group2)}
//           </Accordion>
//         </AcordeonContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Tickets;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
// import { Accordion, Button } from 'react-bootstrap';
// import connectApi from '../../hooks/connectAPI';

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   text-align: left;
//   margin-bottom: 20px;
// `;

// const AcordeonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   border: 1.75px solid transparent;
//   border-color: var(--primaryColor);
//   padding: 10px;
//   border-radius: 10px;
//   background-color: white;
//   color: var(--myBlack);
//   justify-content: center;
//   align-items: center;
//   text-align: left;
// `;


// const ButtonContainer=styled.div`
// width: 97%;
// display: flex;
// flex-direction:row;
// justify-content: center;
// align-items: center;
// text-align: center;
// `;

// const ButtonColumn=styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// text-align: center;
// `;

// function Tickets() {
//   const navigate = useNavigate();
//   const { data, getData, error, isLoading } = useApi()
//   const [group, setGroup] = useState(1);

//   const handleGroup1 = () => {
//     setGroup(1);
//   };

//   const handleGroup2 = () => {
//     setGroup(2);
//   };

//   return (
//     <>
//       <WhiteBanner>
//         <TextContainer>
//           <h3>Selecciona el tipo de entrada</h3>
//           <p style={{ color: '#6313F2' }}>Las entradas incluyen</p>
//           <ul>
//             <li>Welcome Pack del asistente</li>
//             <li>Asistencia a ponencias y clases magistrales</li>
//             <li>Coffee Break, comida, y cena cóctel y copa</li>
//           </ul>
//         </TextContainer>
//       </WhiteBanner>

//       <WhiteBanner>

//           <ButtonContainer>
//           <ButtonColumn className="col-8 col-lg-6">
//           <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px' }}>
//             Administración pública, entidades sin ánimo de lucro y educación
//           </button>
//           </ButtonColumn>
//           <ButtonColumn className="col-4 col-lg-6">
//           <button className='minimalButton' onClick={handleGroup2}>
//             Empresas privadas
//           </button>
//           </ButtonColumn>


//         </ButtonContainer>

//         <AcordeonContainer>
//           <Accordion defaultActiveKey="0">
//             {group === 1 && (
//               <>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>
//                     Entrada 23 de mayo
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada para el evento del 23 de mayo. Incluye acceso completo a todas las actividades del día.</p>
//                     <p><b>Precio:</b> $50</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>

//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>
//                     Entrada 24 de mayo
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada para el evento del 24 de mayo. Incluye acceso completo a todas las actividades del día.</p>
//                     <p><b>Precio:</b> $60</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>

//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>
//                     Entrada completa
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada completa para ambos días del evento. Incluye todos los beneficios y actividades.</p>
//                     <p><b>Precio:</b> $100</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </>
//             )}

//             {group === 2 && (
//               <>
//                   <Accordion.Item eventKey="">
//                   <Accordion.Header>
//                     Entrada online
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.</p>
//                     <p><b>Precio:</b> $30</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>

//                 <Accordion.Item eventKey="4">
//                   <Accordion.Header>
//                     Entrada VIP
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada VIP para ambos días del evento. Incluye acceso preferencial, sala VIP y otros beneficios exclusivos.</p>
//                     <p><b>Precio:</b> $200</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>

//                 <Accordion.Item eventKey="5">
//                   <Accordion.Header>
//                     Entrada grupal
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><b>Descripción:</b> Entrada grupal para 5 personas. Incluye todos los beneficios del evento con un descuento especial por grupo.</p>
//                     <p><b>Precio:</b> $400</p>
//                     <button className="blueButton">
//                       Comprar
//                     </button>
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </>
//             )}
//           </Accordion>
//         </AcordeonContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Tickets;
