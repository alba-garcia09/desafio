import { useState } from 'react';

function useApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getData({ route, method = 'GET', body }) {
    setIsLoading(true);
    setError(null); // Reset error state before a new request
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await fetch(`https://desafiotripulacionesbackend.onrender.com/${route}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '', // Include token in Authorization header if exists
        },
        method,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const responseAsJson = await response.json();
      if (responseAsJson.token) {
        localStorage.setItem('token', responseAsJson.token); // Save token if returned in the response
      }

      setData(responseAsJson);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, getData, error, isLoading };
}

export default useApi;
