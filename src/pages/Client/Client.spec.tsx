import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Client from './Client';

describe('Client page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render page with CreatePerson button', () => {
    render(<Client />);

    const createButton = screen.getByRole('button', {
      name: /create person/i,
    });

    expect(createButton).toBeInTheDocument();
  });

  it('should not render list when there are no person', () => {
    render(<Client />);

    const list = screen.queryByRole('list');

    expect(list).not.toBeInTheDocument();
  });

  it('should create a new person on CreatePerson button click', () => {
    render(<Client />);

    const createButton = screen.getByRole('button', {
      name: /create person/i,
    });

    fireEvent.click(createButton);

    const personList = screen.getAllByRole('listitem');
    const ids = screen.getAllByLabelText('person-id');
    const inputValues = screen.getAllByPlaceholderText('Name');
    expect(personList).toHaveLength(1);
    expect(ids[0]).toHaveTextContent('0');
    expect(inputValues[0]).toHaveTextContent('');
  });

  it('should update person name when user types', () => {
    render(<Client />);

    const createButton = screen.getByRole('button', {
      name: /create person/i,
    });
    fireEvent.click(createButton);

    const inputText = 'John Doe';
    const nameInput = screen.getByRole('textbox');

    userEvent.type(nameInput, inputText);

    expect(nameInput).toHaveValue('John Doe');
  });

  it('should delete person on delete button click', () => {
    render(<Client />);

    const createButton = screen.getByRole('button', {
      name: /create person/i,
    });

    fireEvent.click(createButton);
    const personList = screen.getAllByRole('listitem');
    expect(personList).toHaveLength(1);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });
});
