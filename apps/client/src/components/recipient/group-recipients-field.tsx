import { Dispatch, SetStateAction } from 'react';

import { InputContainer, InputField, InputLabel } from '../../utils/styles';

type Props = {
  setQuery: Dispatch<SetStateAction<string>>;
};

export default function GroupRecipientsField({ setQuery }: Props) {
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipients</InputLabel>
        <InputField onChange={(e) => setQuery(e.target.value)} />
      </InputContainer>
    </section>
  );
}
