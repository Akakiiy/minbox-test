import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('adds new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What need to be done?');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New task')).toBeInTheDocument();
  });
  it('changes task filter', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Completed')).toHaveClass('active');
    expect(screen.getByText('All')).not.toHaveClass('active');
    expect(screen.getByText('Uncompleted')).not.toHaveClass('active');

    fireEvent.click(screen.getByText('Uncompleted'));
    expect(screen.getByText('Uncompleted')).toHaveClass('active');
    expect(screen.getByText('All')).not.toHaveClass('active');
    expect(screen.getByText('Completed')).not.toHaveClass('active');
  });
});
