import Button from 'components/Button/Button';
import PersonField from 'components/PersonField/PersonField';
import { useState } from 'react';
import { Person } from 'types/Person.type';
import Persons from 'utils/Persons';
import Server from 'utils/Server';

let id = -1;

export default function Client() {
  const [personList, setPersonList] = useState<Persons>(new Persons());

  const onClickCreatePerson = () => {
    const person = {
      id: ++id,
      name: '',
    };

    setPersonList(personList.add(person));
    savePerson(person);
  };

  const savePerson = (person: Person) => {
    const method = !personList.has(person) ? 'post' : 'patch';

    return Server[method](person).then(onSaveSuccess);
  };

  // Only for debugging purposes
  const onSaveSuccess = (person: Person) => {
    return console.log(`Person saved: `, person);
  };

  /*  [WIP]: Waiting on backend team to develop this API service 🙄
   *  TODO: Integrate with backend API
   */
  const deletePerson = (person: Person) => {
    setPersonList(personList.remove(person));
  };

  const handlePersonNameChange = (name: string, person: Person) => {
    return setPersonList(personList.update({ ...person, name }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Button
        label="Create Person"
        className="bg-green-500 hover:bg-green-600 focus:ring-green-300"
        onClick={onClickCreatePerson}
      />

      {personList.get().length > 0 && (
        <ul>
          {personList.get().map((person: any) => (
            <PersonField
              key={person.id}
              person={person}
              onChange={handlePersonNameChange}
              saveName={savePerson}
              deletePerson={deletePerson}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
