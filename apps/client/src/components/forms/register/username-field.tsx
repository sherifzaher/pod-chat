import { UseFormRegister } from 'react-hook-form';
import { AxiosError } from 'axios';
import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel
} from '../../../utils/styles';
import { checkUsernameExists } from '../../../utils/api';

interface IUsernameField {
  register: UseFormRegister<CreateUserParams>;
  errorMessage?: string;
}

export default function UsernameField({ register, errorMessage }: IUsernameField) {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InputError>{errorMessage}</InputError>
      </InputContainerHeader>
      <InputField
        {...register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'username must be at least 3 characters' },
          maxLength: { value: 32, message: 'max characters are 16' },
          validate: {
            checkUsername: async (val: string) => {
              try {
                await checkUsernameExists(val);
              } catch (error) {
                return (error as AxiosError).response?.status === 409 && 'Username already exists';
              }
            }
          }
        })}
        id="username"
        name="username"
      />
    </InputContainer>
  );
}
