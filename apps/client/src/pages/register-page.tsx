import { Page } from '../utils/styles';
import RegisterForm from '../components/forms/register-form';

function RegisterPage() {
  return (
    <Page display="flex" alignItems="center" justifyContent="center">
      <RegisterForm />
    </Page>
  );
}

export default RegisterPage;
