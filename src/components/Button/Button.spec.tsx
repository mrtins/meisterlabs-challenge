import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

const onClick = jest.fn();

const renderButton = () => {
  render(
    <Button
      label="Test Button"
      className="bg-green-500 hover:bg-green-600 focus:ring-green-300"
      onClick={onClick}
    />
  );
};

describe('Button component', () => {
  it('should render button with correct label', () => {
    renderButton();

    const button = screen.getByRole('button', { name: /test button/i });

    expect(button).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    renderButton();

    const button = screen.getByRole('button', { name: /test button/i });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render correct css classes', () => {
    renderButton();

    const button = screen.getByRole('button', { name: /test button/i });

    expect(button).toHaveClass(
      'bg-green-500 hover:bg-green-600 focus:ring-green-300'
    );
  });
});
