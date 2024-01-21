import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './index.module.scss';
import { postRegisterUser } from '../../utils/api';
import { Button } from '../../utils/styles';
import UsernameField from './register/username-field';
import NameField from './register/name-field';
import PasswordField from './register/password-field';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserParams>();

  const navigate = useNavigate();
  const onSubmit = async (data: CreateUserParams) => {
    try {
      await postRegisterUser(data);
      toast.success('Account Created!');
      navigate('/login');
    } catch (err) {
      console.log(err);
      toast.error('Error creating user');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UsernameField register={register} errorMessage={errors.username?.message} />
      <NameField
        register={register}
        firstNameError={errors.firstName?.message}
        lastNameError={errors.lastName?.message}
      />
      <PasswordField register={register} />
      <Button className={styles.button}>Create My Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
