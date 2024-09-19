import LoginForm from '../../components/LoginForm';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Login = () => {

  return (<>
    <Container>
      <LoginForm />
    </Container>

  </>
  );
};


export default Login;