import { UseFormRegister } from 'react-hook-form';
import styles from '../index.module.scss';
import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel
} from '../../../utils/styles';

interface INameField {
  register: UseFormRegister<CreateUserParams>;
  firstNameError?: string;
  lastNameError?: string;
}

export default function NameField({ register, firstNameError, lastNameError }: INameField) {
  return (
    <section className={styles.nameFieldRow}>
      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputError>{firstNameError}</InputError>
        </InputContainerHeader>
        <InputField
          {...register('firstName', {
            required: 'First name is required',
            minLength: { value: 2, message: 'firstname must be at least 2 characters' },
            maxLength: { value: 32, message: 'max characters are 32' }
          })}
          id="firstName"
          name="firstName"
        />
      </InputContainer>
      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputError>{lastNameError}</InputError>
        </InputContainerHeader>
        <InputField
          {...register('lastName', {
            required: 'Last name is required',
            minLength: { value: 2, message: 'lastname must be at least 2 characters' },
            maxLength: { value: 32, message: 'max characters are 32' }
          })}
          id="lastName"
          name="lastName"
        />
      </InputContainer>
    </section>
  );
}
