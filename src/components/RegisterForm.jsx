import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { evaluatePasswordStrength } from '../utils/passwordUtils'; // Importa la función de evaluación

// Styled components
const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid var(--primaryColor);
  border-radius: 16px;
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
  color: var(--myBlack);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: span 2;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: var(--myBlack);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primaryColor);
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
  grid-column: span 2;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: var(--secundaryColor);
  color: white;
  cursor: pointer;
  grid-column: span 2;

  &:hover {
    background-color: var(--primaryColor);
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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    company: '',
    charge: '',
    role: '',
    linkedIn: '',
    allergies: '',
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    console.log('Form Data:', formData);

    try {
      const response = await fetch('https://desafiotripulacionesbackend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response:', result);

        if (result.success) {
          setSuccessMessage('Registration successful. Please check your email to confirm your account.');
          setTimeout(() => {
            navigate('/login'); // Redirige a la página de inicio de sesión o a otra página
          }, 3000); // Redirige después de 3 segundos
        } else {
          setError(result.message || 'There was an error with the registration.');
        }
      } else {
        const errorResult = await response.json();
        console.error('Error Response:', errorResult);
        setError('There was an error with the registration. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError('There was an error with the registration. Please try again.');
    }
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
        {/* Username */}
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {/* Name */}
        <FormGroup>
          <Label htmlFor="name">First Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {/* Last Name */}
        <FormGroup>
          <Label htmlFor="lastName">Last Name:</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {/* Company */}
        <FormGroup>
          <Label htmlFor="company">Company:</Label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Charge */}
        <FormGroup>
          <Label htmlFor="charge">Charge:</Label>
          <Input
            type="text"
            id="charge"
            name="charge"
            value={formData.charge}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Role */}
        <FormGroup>
          <Label htmlFor="role">Role:</Label>
          <Input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </FormGroup>

        {/* LinkedIn */}
        <FormGroup>
          <Label htmlFor="linkedIn">LinkedIn Profile:</Label>
          <Input
            type="url"
            id="linkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Allergies */}
        <FormGroup>
          <Label htmlFor="allergies">Allergies:</Label>
          <Input
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Email */}
        <FullWidthFormGroup>
          <Label htmlFor="email">Email Address:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FullWidthFormGroup>

        {/* Password */}
        <FullWidthFormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
          <PasswordStrengthBar>
            <StrengthIndicator
              strength={strengthConfig[passwordStrength]?.strength || '0%'}
              color={strengthConfig[passwordStrength]?.color || 'red'}
            />
          </PasswordStrengthBar>
        </FullWidthFormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
