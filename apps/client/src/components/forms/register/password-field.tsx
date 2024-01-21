import { UseFormRegister } from 'react-hook-form';
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
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputError>{errorMessage}</InputError>
      </InputContainerHeader>
      <InputField
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'password must be at least 8 characters' },
          maxLength: { value: 32, message: 'Max characters are 32' }
        })}
        id="password"
        type="password"
        name="password"
      />
    </InputContainer>
  );
}
