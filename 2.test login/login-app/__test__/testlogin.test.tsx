import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('LoginScreen Navigation', () => {
  it('redirige a Home si las credenciales son correctas', async () => {
    const { getByLabelText, getByText, queryByTestId } = renderWithNavigation();

    const emailInput = getByLabelText('input-email');
    const passwordInput = getByLabelText('input-password');
    const loginButton = getByText('Ingresar');

    fireEvent.changeText(emailInput, 'admin@test.com');
    fireEvent.changeText(passwordInput, '1234');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(queryByTestId('home-text')).toBeTruthy();
    });
  });

  it('muestra mensaje de error si las credenciales son incorrectas', async () => {
    const { getByLabelText, getByText, queryByTestId } = renderWithNavigation();

    const emailInput = getByLabelText('input-email');
    const passwordInput = getByLabelText('input-password');
    const loginButton = getByText('Ingresar');

    fireEvent.changeText(emailInput, 'usuario@test.com');
    fireEvent.changeText(passwordInput, 'wrong');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(queryByTestId('error-message')).toBeTruthy();
      expect(getByText('Credenciales incorrectas')).toBeTruthy();
    });
  });
});