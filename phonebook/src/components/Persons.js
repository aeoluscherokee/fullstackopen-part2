import React from "react";

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map((person, id) => (
        <p key={id}>
          {person.name} {person.number}
          <button onClick={onDeletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};
export default Persons;
