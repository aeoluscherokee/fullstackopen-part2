import React, { useState, useEffect } from "react";
import personService from "./services/person";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState();
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

        setNotification({
          message: `${existingPerson.name}'s number has been updated`,
          type: "success-message",
        });
        setTimeout(() => setNotification(null), 5000);
      } else return;
    } else {
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setNotification({
          message: `${person.name} is already added to phonebook`,
          type: "success-message",
        });
        setTimeout(() => setNotification(null), 5000);
      });
    }
  };

  const deletePerson = (id, name) => {
    const handleDelete = () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .del(id)
          .then(() =>
            setPersons(persons.filter((person) => person.name !== name))
          )
          .catch(() => {
            setNotification({
              message: `${name} was already removed from server`,
              type: "error-message",
            });
            setTimeout(() => setNotification(null), 5000);
          });
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
      <Notification notification={notification} />
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
