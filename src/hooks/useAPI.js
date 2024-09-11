import { useState } from 'react';

function useApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para transformar la URL
  const transformRowUrl = (rowUrl) => {
    const splitedRowUrl = rowUrl.split('/');
    const imgId = splitedRowUrl[5];
    const url = `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`;
    return url;
  };

  async function getData({ route, method = 'GET', body }) {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const token = localStorage.token;
        const response = await fetch(`https://desafiotripulacionesbackend.onrender.com/${route}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          method,
          body: body && JSON.stringify(body),
        });

        if (!response.ok) {
          setError('Error al obtener los datos');
          setIsLoading(false);
          return;
        }

        const responseAsJson = await response.json();
        if (responseAsJson.token) {
          localStorage.token = responseAsJson.token;
        }

        let responseToConvert;
        if (Array.isArray(responseAsJson)) {
          responseToConvert = responseAsJson;
        } else {
          responseToConvert = [responseAsJson];
        }

        const transformedData = responseToConvert.map(item => {
          if (item.image) {
            return {
              ...item,
              image: item.image.map(imgUrl => transformRowUrl(imgUrl))
            };
          }
          return item;
        });

        setData(Array.isArray(responseAsJson) ? transformedData : transformedData[0]);
      } catch (err) {
        setError('Error al obtener los datos');
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  }

  return { data, getData, error, isLoading };
}

export default useApi;