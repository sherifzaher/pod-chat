import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './index.module.scss';
import { postRegisterUser } from '../../utils/api';
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserParams>();
  const onSubmit = async (data: CreateUserParams) => {
    try {
      await postRegisterUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          {...register('email', { required: 'Email is required' })}
          id="email"
          name="email"
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            {...register('firstName', { required: 'First name is required' })}
            id="firstName"
            name="firstName"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            {...register('lastName', { required: 'Last name is required' })}
            id="lastName"
            name="lastName"
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          {...register('password', { required: 'Password is required' })}
          id="password"
          type="password"
          name="password"
        />
      </InputContainer>
      <Button className={styles.button}>Create My Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
