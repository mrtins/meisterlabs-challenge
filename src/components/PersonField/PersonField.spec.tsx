import { fireEvent, render, screen } from '@testing-library/react';
import { Person } from 'types/Person.type';
import PersonField from './PersonField';
import userEvent from '@testing-library/user-event';

const mockPerson: Person = {
  id: 1,
  name: '',
};

const onChange = jest.fn();
const saveName = jest.fn();
const deletePerson = jest.fn();

const renderPersonField = () => {
  return render(
    <PersonField
      person={mockPerson}
      onChange={onChange}
      saveName={saveName}
      deletePerson={deletePerson}
    />
  );
};

describe('PersonField component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with correct person data', () => {
    renderPersonField();

    const personId = screen.getByText(/1/i);
    const nameInput = screen.getByRole('textbox');

    expect(personId).toBeInTheDocument();
    expect(nameInput).toHaveValue(mockPerson.name);
  });

  it('should call onChange when input value changes', () => {
    renderPersonField();

    const inputText = 'J';
    const nameInput = screen.getByRole('textbox');

    userEvent.type(nameInput, inputText);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(inputText, mockPerson);
  });

  it('should call saveName on save button click', () => {
    renderPersonField();

    const saveButton = screen.getByRole('button', { name: /save name/i });

    fireEvent.click(saveButton);

    expect(saveName).toHaveBeenCalledTimes(1);
    expect(saveName).toHaveBeenCalledWith(mockPerson);
  });

  it('should call deletePerson on delete button click', () => {
    renderPersonField();

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(deleteButton);

    expect(deletePerson).toHaveBeenCalledTimes(1);
    expect(deletePerson).toHaveBeenCalledWith(mockPerson);
  });
});
