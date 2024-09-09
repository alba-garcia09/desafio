import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Accordion, Button } from 'react-bootstrap';

const WhiteBanner = styled.div`
  width: 100%;
  color: var(--myBlack);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
`;

const AcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: transparent;
  color: var(--myBlack) !important;
  justify-content: center;
  align-items: center;
  text-align: left;
  border-top: 1.75px solid var(--primaryColor);
  font-size: 0.9em; /* Tamaño de fuente ajustado */

  .accordion-item {
    border: none;
    margin-bottom: 10px;
    font-size: 0.9em;
  }

  .accordion-button {
    border: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
    font-size: 0.9em; /* Tamaño de fuente ajustado */
  }

  .accordion-button:active,
  .accordion-button:focus {
    border: none !important;
    box-shadow: none !important;
    background-color: var(--myBlack);
    font-size: 0.9em;
  }

  .accordion-button:not(.collapsed) {
    background-color: transparent !important;
    color: var(--primaryColor) !important; /* Color cuando el item está expandido */
    font-size: 0.9em;
  }

  .accordion-body {
    border-top: none !important;
    padding: 20px; /* Ajusta el padding para el contenido visible */
    font-size: 0.9em; /* Tamaño de fuente ajustado */
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: top;
    width: 100%;
    padding: 10px;
    border-bottom: 1.5px solid var(--primaryColor); /* Solo línea inferior */
    background-color: transparent; /* Color de fondo predeterminado */
    color: var(--myBlack) !important; /* Color del texto predeterminado */
    transition: background-color 0.3s, color 0.3s; /* Transiciones suaves */
    font-size: 0.9em; /* Tamaño de fuente ajustado */
  }

  .accordion-header:hover {
    background-color: transparent; /* Fondo de hover, mantén transparente si no quieres cambiarlo */
    color: var(--primaryColor) !important; /* Color del texto en hover */
    font-size: 0.9em;
  }

  .accordion-button:not(.collapsed) + .accordion-header {
    color: var(--primaryColor) !important; /* Color del texto cuando el acordeón está expandido */
    font-size: 0.9em;
  }

  .accordion-item:not(.show) .accordion-header:hover {
    color: var(--primaryColor) !important; /* Color del texto en hover cuando está colapsado */
    font-size: 0.9em;
  }

  .column {
    flex: 1;
    font-size: 0.9em;
  }

  .priceColumn {
    text-align: right;
    padding-left: 20px;
    font-size: 0.9em;
  }
`;

const ButtonContainer = styled.div`
  width: 90%;
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
  flex: 1;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  font-size: 1em;
  padding: 10px 20px;
  border: 2px solid var(--primaryColor);
  background-color: ${({ active }) => (active ? 'var(--primaryColor)' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'var(--primaryColor)')};
  cursor: pointer;

  &:hover {
    background-color: var(--primaryColor);
    color: white;
  }
`;

const accordionItemsGroup1 = [
  {
    eventKey: "1",
    time: "09:30",
    title: "RECEPCIÓN & ACREDITACIONES",
    duration: "30 minutos"
  },
  {
    eventKey: "2",
    time: "09:30",
    title: "DESAYUNO & BIENVENIDA - Terraza La Font Blanca",
    duration: "1 hora",
  },
  {
    eventKey: "3",
    time: "10:45",
    title: "Tendencias y Prospectiva en E-learning para una educación exponencial",
    description: "Abordará las evoluciones emergentes en el panorama educativo superior",
    speaker: "Marta Paredes & Sol García - Prof. Universidad Complutense de Madrid & Directora SAMOO",
    duration: "30 minutos",
    type: "Ponencia"
  },
];

const accordionItemsGroup2 = [
  {
    eventKey: "3",
    time: "Virtual",
    description: "Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.",
    price: "$30",
    title: "Entrada online"
  },
  {
    eventKey: "4",
    time: "VIP",
    description: "Entrada VIP para ambos días del evento. Incluye acceso preferencial, sala VIP y otros beneficios exclusivos.",
    price: "$200",
    title: "Entrada VIP"
  },
  {
    eventKey: "5",
    time: "Grupo",
    description: "Entrada grupal para 5 personas. Incluye todos los beneficios del evento con un descuento especial por grupo.",
    price: "$400",
    title: "Entrada grupal"
  }
];

function Tickets() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(1);
  const handleGroup1 = () => setGroup(1);
  const handleGroup2 = () => setGroup(2);

  // Determina qué array de items usar basado en el grupo seleccionado
  const accordionItems = group === 1 ? accordionItemsGroup1 : accordionItemsGroup2;

  return (
    <>
      <WhiteBanner>
        <ButtonContainer>
          <ButtonColumn className="col-6 col-lg-6">
            <StyledButton className='minimalButton' active={group === 1} onClick={handleGroup1}>
              23 de mayo
            </StyledButton>
          </ButtonColumn>
          <ButtonColumn className="col-6 col-lg-6">
            <StyledButton className='minimalButton' active={group === 2} onClick={handleGroup2}>
              24 de mayo
            </StyledButton>
          </ButtonColumn>
        </ButtonContainer>

        <AcordeonContainer>
          <Accordion defaultActiveKey="">
            {accordionItems.map(item => (
              <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
                <Accordion.Header>
                  <div className="col-3 col-lg-6">
                    <p className='programButton'>{item.time}</p>
                  </div>
                  <div className="col-9 col-lg-6">
                    {item.type && <p className="programButton">{item.type}</p>}
                    <p className="programButton">{item.title}</p>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  {item.description && <p className="programButton"><b>Descripción: </b>{item.description}</p>}
                  {item.speaker && <p className="programButton">{item.speaker}</p>}
                  {item.duration && (
                    <>
                      <i className="bi bi-stopwatch"></i>
                      <p className="programButton" >{item.duration}</p>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </AcordeonContainer>
      </WhiteBanner>
    </>
  );
}

export default Tickets;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
// import { Accordion, Button } from 'react-bootstrap';

// const WhiteBanner = styled.div`
//   width: 100%;
//   color: var(--myBlack);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding-top: 20px;
// `;

// const AcordeonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   padding: 20px;
//   background-color: transparent;
//   color: var(--myBlack) !important;
//   justify-content: center;
//   align-items: center;
//   text-align: left;
//   border-top: 1.75px solid var(--primaryColor);
//   font-size: 0.9em; /* Tamaño de fuente ajustado */

//   .accordion-item {
//     border: none;
//     margin-bottom: 10px;
//     font-size: 0.9em
//   }

//   .accordion-button {
//     border: none !important;
//     box-shadow: none !important;
//     background-color: transparent !important;
//     font-size: 0.9em; /* Tamaño de fuente ajustado */
//   }

//   .accordion-button:active,
//   .accordion-button:focus {
//     border: none !important;
//     box-shadow: none !important;
//     background-color: var(--myBlack);
//     font-size: 0.9em
//   }

//   .accordion-button:not(.collapsed) {
//     background-color: transparent !important;
//     color: var(--primaryColor) !important; /* Color cuando el item está expandido */
//     font-size: 0.9em
//   }

//   .accordion-body {
//     border-top: none !important;
//     padding: 20px; /* Ajusta el padding para el contenido visible */
//     font-size: 0.9em; /* Tamaño de fuente ajustado */
//   }

//   .accordion-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: top;
//     width: 100%;
//     padding: 10px;
//     border-bottom: 1.5px solid var(--primaryColor); /* Solo línea inferior */
//     background-color: transparent; /* Color de fondo predeterminado */
//     color: var(--myBlack) !important; /* Color del texto predeterminado */
//     transition: background-color 0.3s, color 0.3s; /* Transiciones suaves */
//     font-size: 0.9em; /* Tamaño de fuente ajustado */
//   }

//   .accordion-header:hover {
//     background-color: transparent; /* Fondo de hover, mantén transparente si no quieres cambiarlo */
//     color: var(--primaryColor) !important; /* Color del texto en hover */
//     font-size: 0.9em
//   }

//   .accordion-button:not(.collapsed) + .accordion-header {
//     color: var(--primaryColor) !important; /* Color del texto cuando el acordeón está expandido */
//     font-size: 0.9em
//   }

//   .accordion-item:not(.show) .accordion-header:hover {
//     color: var(--primaryColor) !important; /* Color del texto en hover cuando está colapsado */
//     font-size: 0.9em
//   }

//   .column {
//     flex: 1;
//     font-size: 0.9em
//   }

//   .priceColumn {
//     text-align: right;
//     padding-left: 20px;
//     font-size: 0.9em

//   }
// `;

// const ButtonContainer = styled.div`
//   width: 90%;
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
//   flex: 1;
// `;

// const accordionItemsGroup1 = [
//   {
//     eventKey: "1",
//     time: "09:30",
//     title: "RECEPCIÓN & ACREDITACIONES",
//     duration: "30 minutos"
//   },
//   {
//     eventKey: "2",
//     time: "09:30",
//     title: "DESAYUNO & BIENVENIDA - Terraza La Font Blanca",
//     duration: "1 hora",
//   },
//   {
//     eventKey: "3",
//     time: "10:45",
//     title: "Tendencias y Prospectiva en E-learning para una educación exponencial",
//     description: "Abordará las evoluciones emergentes en el panorama educativo superior",
//     speaker: "Marta Paredes & Sol García - Prof. Universidad Complutense de Madrid & Directora SAMOO",
//     duration: "30 minutos",
//     type: "Ponencia"
//   },
// ];

// const accordionItemsGroup2 = [
//   {
//     eventKey: "3",
//     time: "Virtual",
//     description: "Entrada para participar en el evento de manera virtual. Incluye acceso a todas las transmisiones en vivo.",
//     price: "$30",
//     title: "Entrada online"
//   },
//   {
//     eventKey: "4",
//     time: "VIP",
//     description: "Entrada VIP para ambos días del evento. Incluye acceso preferencial, sala VIP y otros beneficios exclusivos.",
//     price: "$200",
//     title: "Entrada VIP"
//   },
//   {
//     eventKey: "5",
//     time: "Grupo",
//     description: "Entrada grupal para 5 personas. Incluye todos los beneficios del evento con un descuento especial por grupo.",
//     price: "$400",
//     title: "Entrada grupal"
//   }
// ];

// function Tickets() {
//   const navigate = useNavigate();
//   const [group, setGroup] = useState(1);
//   const handleGroup1 = () => setGroup(1);
//   const handleGroup2 = () => setGroup(2);

//   // Determina qué array de items usar basado en el grupo seleccionado
//   const accordionItems = group === 1 ? accordionItemsGroup1 : accordionItemsGroup2;

//   return (
//     <>
//       <WhiteBanner>
//         <ButtonContainer>
//           <ButtonColumn className="col-6 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup1} style={{ marginRight: '10px', fontSize: '1em' }}>
//               23 de mayo
//             </button>
//           </ButtonColumn>
//           <ButtonColumn className="col-6 col-lg-6">
//             <button className='minimalButton' onClick={handleGroup2} style={{ fontSize: '1em' }}>
//               24 de mayo
//             </button>
//           </ButtonColumn>
//         </ButtonContainer>

//         <AcordeonContainer>
//           <Accordion defaultActiveKey="">
//             {accordionItems.map(item => (
//               <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
//                 <Accordion.Header>
//                   <div className="col-3 col-lg-6">
//                     <p className='programButton'>{item.time}</p>
//                   </div>
//                   <div className="col-9 col-lg-6">
//                     {item.type && <p className="programButton">{item.type}</p>}
//                     <p className="programButton">{item.title}</p>
//                   </div>
//                 </Accordion.Header>

//                 <Accordion.Body>
//                   {item.description && <p className="programButton"><b>Descripción: </b>{item.description}</p>}
//                   {item.speaker && <p className="programButton">{item.speaker}</p>}
//                   {item.duration && (
//                     <>
//                       <i className="bi bi-stopwatch"></i>
//                       <p className="programButton" >{item.duration}</p>
//                     </>
//                   )}
//                 </Accordion.Body>
//               </Accordion.Item>
//             ))}
//           </Accordion>
//         </AcordeonContainer>
//       </WhiteBanner>
//     </>
//   );
// }

// export default Tickets;

