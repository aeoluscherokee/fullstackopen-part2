import React, { useState, useEffect } from "react";
import personService from "./service/person";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

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

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const personToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, personObject)
          .then((response) =>
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response
              )
            )
          );
      } else return;
    } else {
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        alert(`${person.name} is already added to phonebook`);
      });
    }
  };

  const deletePerson = (id, name) => {
    const handleDelete = () => {
      if (window.confirm("Delete", name)) {
        personService
          .del(id)
          .then(() =>
            setPersons(persons.filter((person) => person.name !== name))
          );
      } else return;
    };
    return handleDelete;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setShowAll(false);
    if (event.target.value === "") {
      setShowAll(true);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h3>add new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personToShow} onDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
