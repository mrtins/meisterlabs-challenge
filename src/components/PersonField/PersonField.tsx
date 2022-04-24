import Button from 'components/Button/Button';
import { Person } from 'types/Person.type';

interface PersonFieldProps {
  person: Person;
  onChange: (name: string, person: Person) => void;
  saveName: (person: Person) => void;
  deletePerson: (person: Person) => void;
}

export default function PersonField({
  person,
  onChange,
  saveName,
  deletePerson,
}: PersonFieldProps) {
  return (
    <li className="flex items-center justify-center my-6">
      <span aria-label="person-id">{person.id}</span>

      <input
        type="text"
        name="person-name"
        placeholder="Name"
        className="shadow-md rounded border-2 border-blue-200 mx-4"
        value={person.name}
        onChange={(e) => onChange(e.target.value, person)}
      />

      <Button
        label="Save Name"
        className="text-sm bg-blue-500 hover:bg-blue-600 focus:ring-blue-300"
        onClick={() => saveName(person)}
      />

      <Button
        label="Delete"
        className="text-sm ml-2 bg-red-500 hover:bg-red-600 focus:ring-red-300"
        onClick={() => deletePerson(person)}
      />
    </li>
  );
}
