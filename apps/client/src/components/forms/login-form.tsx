import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { postLoginUser } from '../../utils/api';
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';
import { AppDispatch } from '../../store';
import { setLoading, setUser } from '../../store/slices/user-slice';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCredentialsParams>({ reValidateMode: 'onBlur' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const socket = useSocketContext();
  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      const response = await postLoginUser(data);
      dispatch(setLoading(false));
      dispatch(setUser(response.data));
      socket.connect();
      navigate('/conversations');
    } catch (err) {
      console.log(err);
      console.log(socket.connected);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InputField
          {...register('username', { required: 'Username is required.' })}
          id="username"
          type="text"
          name="username"
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
