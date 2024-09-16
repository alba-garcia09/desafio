//sin decidificar
// import { useNavigate } from 'react-router-dom';
// import useApi from '../../hooks/useAPI.js';
// import LoadingOverlay from '../../components/Spinner.jsx';
// import { useState, useEffect } from 'react';
// import styled from 'styled-components';

// // Estilos para los componentes
// const Container = styled.div`
//   width: 100%;
//   max-width: 1000px;
//   margin: 0 auto;
//   padding: 0 20px;
//   padding-top: 2em;
//   box-sizing: border-box;

//   @media (max-width: 767px) {
//     max-width: 100%;
//     padding: 0 10px;
//   }
// `;

// const Text = styled.div`
//   margin: 0 auto;
//   padding: 0 20px;
//   padding-bottom: 2em;
//   text-align: left;
//   justify-content: left;
//   align-content: left;
// `;

// function MyProfile() {
//   const { data, getData, error, isLoading } = useApi();
//   const [userId, setUserId] = useState('66e8b7d7127e4eb8b049bbdc'); // Estado para almacenar el ID del usuario
//    // Efecto para hacer la llamada a la API cuando se obtiene el userId
//   useEffect(() => {
//     if (userId) {
//       // Si tenemos el user_id, hacemos la petición a la API
//       getData({ route: `users/${userId}` });
//       console.log('data', data)
//     }
//   }, []);

//   if (isLoading) {
//     return <LoadingOverlay isLoading={true} />;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Container>
//       {data ? (
//         <>
//           <h1>Perfil de {data.name}</h1>
//           <Text>
//             <p><strong>Email:</strong> {data.email}</p>
//             <p><strong>Username:</strong> {data.username}</p>
//             {/* Aquí puedes agregar más campos del perfil si están disponibles */}
//           </Text>
//         </>
//       ) : (
//         <p>No se encontró la información del perfil.</p>
//       )}
//     </Container>
//   );
// }

// export default MyProfile;


import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useAPI.js';
import LoadingOverlay from '../../components/Spinner.jsx';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
// Estilos para los componentes
const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 2em;
  box-sizing: border-box;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Text = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 2em;
  text-align: left;
  justify-content: left;
  align-content: left;
`;


function MyProfile() {
  const { data, getData, error, isLoading } = useApi();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Función para obtener el ID del usuario del token
    const extractUserIdFromToken = () => {
      const token = '03cda1d1a7d86fd4a1d1473a2cc5a611cd0d383a'; // O la forma en que almacenas el token
      if (token) {
        try {
          const decodedToken = jwt.decode(token); // Usamos jwt.decode
          return decodedToken.userId; // Cambia esto al nombre correcto del campo en tu token
        } catch (e) {
          console.error('Error decoding token:', e);
        }
      }
      return null;
    };

    const id = extractUserIdFromToken();
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getData({ route: `users/${userId}` });
    }
  }, [userId]);

  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      {data ? (
        <>
          <h1>Perfil de {data.name}</h1>
          <Text>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Username:</strong> {data.username}</p>
            {/* Aquí puedes agregar más campos del perfil si están disponibles */}
          </Text>
        </>
      ) : (
        <p>No se encontró la información del perfil.</p>
      )}
    </Container>
  );
}

export default MyProfile;
