import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './index.module.scss';
import { postLoginUser } from '../../utils/api';
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCredentialsParams>();
  const navigate = useNavigate();
  const socket = useSocketContext();
  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      await postLoginUser(data);
      socket.connect();
      navigate('/conversations');
      console.log(socket.connected);
    } catch (err) {
      console.log(err);
      console.log(socket.connected);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          {...register('email', { required: 'Email is required.' })}
          id="email"
          name="email"
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          {...register('password', { required: 'password is required.' })}
          type="password"
          id="password"
          name="password"
        />
      </InputContainer>
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Dont have an account? </span>
        <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
