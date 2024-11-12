import React from 'react';
import { Person } from '../../types/Person';

interface Props {
  peopleFromServer: Person[];
  setSelectedPerson: React.Dispatch<React.SetStateAction<'' | Person>>;
}

const Content: React.FC<Props> = ({ peopleFromServer, setSelectedPerson }) => {
  const find = (person: Person | '') => {
    if (person) {
      setSelectedPerson(person);
    }
  };

  return (
    <div className="dropdown-content">
      {peopleFromServer.map(person => (
        <div
          className="dropdown-item"
          data-cy="suggestion-item"
          key={person.slug}
          onClick={() => {
            find(person);
          }}
        >
          <p className="has-text-link">{person.name}</p>
        </div>
      ))}
    </div>
  );
};

Content.displayName = 'Content';

export default React.memo(Content);
