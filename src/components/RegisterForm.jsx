// src/components/RegisterForm.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { evaluatePasswordStrength } from '../utils/passwordUtils'; // Importa la función de evaluación

// Styled components
const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #0A3E27;
  border-radius: 8px;
  background-color: #E2D1BF;
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
  color: #0A3E27;
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
  color: #0A3E27;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #0A3E27;
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
  background-color: #CC88FF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #AA66CC;
  }
`;

const PasswordStrengthBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 4px;
  background-color: #ddd;
  margin-top: 0.5rem;
  position: relative;
`;

const StrengthIndicator = styled.div`
  height: 100%;
  border-radius: 4px;
  width: ${({ strength }) => strength};
  background-color: ${({ color }) => color};
  transition: width 0.3s;
`;

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleSubmit = (e) => {
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

    // Handle registration logic
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };

  const strengthConfig = {
    weak: { strength: '33%', color: 'red' },
    medium: { strength: '66%', color: 'orange' },
    strong: { strength: '100%', color: 'green' },
  };

  return (
    <Container>
      <Title>Register</Title>
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
            onChange={handlePasswordChange}
            required
          />
          <PasswordStrengthBar>
            <StrengthIndicator
              strength={strengthConfig[passwordStrength]?.strength || '0%'}
              color={strengthConfig[passwordStrength]?.color || 'red'}
            />
          </PasswordStrengthBar>
        </FormGroup>
        {(error) && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
