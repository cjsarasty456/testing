import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; // ajusta la ruta si el test está dentro de src/

describe('App Component', () => {
  it('renders a welcome message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Open up App.tsx to start working on your app!')).toBeTruthy();
  });
});
