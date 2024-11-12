import React, { useEffect, useRef, useState } from 'react';
import { Person } from '../../types/Person';

interface Props {
  delay: number;
  setFullField: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPerson: React.Dispatch<React.SetStateAction<'' | Person>>;
  selectedPerson: '' | Person;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchInput: React.FC<Props> = ({
  delay,
  setFullField,
  selectedPerson,
  setSelectedPerson,
  setFocus,
}) => {
  const [field, setField] = useState('');

  const timerId = useRef(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPerson('');
    setField(e.target.value);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setFullField(e.target.value);
    }, delay);
  };

  useEffect(() => {
    if (selectedPerson) {
      setField(selectedPerson.name);
      setFocus(false);
    }
  }, [selectedPerson, setFocus]);

  const handleBlur = () => {
    if (!field) {
      setFocus(false);
    }
  };

  return (
    <div className="dropdown-trigger">
      <input
        type="text"
        placeholder="Enter a part of the name"
        className="input"
        data-cy="search-input"
        value={field}
        onChange={e => handleChange(e)}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
      />
    </div>
  );
};
