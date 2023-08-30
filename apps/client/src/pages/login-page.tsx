import { Page } from '../utils/styles';
import LoginForm from '../components/forms/login-form';

function LoginPage() {
  return (
    <Page display="flex" alignItems="center" justifyContent="center">
      <LoginForm />
    </Page>
  );
}

export default LoginPage;
