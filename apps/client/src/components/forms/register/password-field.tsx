import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../index.module.scss';

import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel
} from '../../../utils/styles';

interface IPasswordField {
  register: UseFormRegister<CreateUserParams>;
  errorMessage?: string;
}

export default function PasswordField({ register, errorMessage }: IPasswordField) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputError>{errorMessage}</InputError>
      </InputContainerHeader>
      <div className={styles.passwordContainer}>
        <InputField
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'password must be at least 8 characters' },
            maxLength: { value: 32, message: 'Max characters are 32' }
          })}
        />
        {showPassword ? (
          <AiFillEyeInvisible cursor="pointer" onClick={() => setShowPassword(false)} size={24} />
        ) : (
          <AiFillEye cursor="pointer" onClick={() => setShowPassword(true)} size={24} />
        )}
      </div>
    </InputContainer>
  );
}
