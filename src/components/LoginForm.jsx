import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useApi from '../hooks/useAPI.js';


// Styled components
const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid var(--primaryColor);
  border-radius: 8px;
  background-color: var(--myWhite);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primaryColor);
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;


const Label = styled.label`
  margin-bottom: 0.5rem;
  color: var(--primaryColor);
`;


const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primaryColor);
  border-radius: 4px;
`;


const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;


const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: var(--primaryColor);
  color: var(--myWhite);
  cursor: pointer;


  &:hover {
    background-color: var(--secundaryColor);
  }
`;


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getData, error: apiError, isLoading, data } = useApi();


  useEffect(() => {
    if (data?.token) {
      navigate('/');
    }
  }, [data, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }


    try {
      getData({ route: 'auth/login', method: 'POST', body: { email, password } });
    } catch (err) {
      setError(err.message);
    }
  };


  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };


  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email Address:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        {(error || apiError) && <ErrorMessage>{error || apiError}</ErrorMessage>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};
//sube esto
export default LoginForm;