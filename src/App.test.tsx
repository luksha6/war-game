import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders Gameplay and Player component', () => {
  render(<App />);
  const sampleGameplayText = screen.getByText(/COMBAT STATISTICS/i);
  expect(sampleGameplayText).toBeInTheDocument();
  const samplePlayerText = screen.getByText(/PLAYING/i);
  expect(samplePlayerText).toBeInTheDocument();
});

test('clicking submit attack, left player attack data is stored and displayed', () => {
    render(<App />);
    const input = screen.getAllByRole("spinbutton")[0]
    userEvent.type(input, '99')
    userEvent.click(screen.getAllByText('Attack')[0])
    const samplePlayerTextLeft = screen.getByText(/Left Player Attack: 99/i);
    expect(samplePlayerTextLeft).toBeInTheDocument();
});

test('clicking attack 10 points is stored', () => {
    render(<App />);
    const input = screen.getAllByRole("spinbutton")[0]
    const input2 = screen.getAllByRole("spinbutton")[1]
    userEvent.type(input, '99')
    userEvent.click(screen.getAllByText('Attack')[0])
    userEvent.type(input2, '15')
    userEvent.click(screen.getAllByText('Attack')[1])
    const pointsText = screen.getByText(/10/i);
    expect(pointsText).toBeInTheDocument();
});

test('entering 77 power and clickin attack sets state using setState hook to 77 and displaying it', () => {
    render(<App />);
    const input = screen.getAllByRole("spinbutton")[0]
    userEvent.type(input, '77')
    userEvent.click(screen.getAllByRole('button')[0])
    const setStateValue = screen.getByText(/Attack: 77/i);
    expect(setStateValue).toBeInTheDocument();
});

