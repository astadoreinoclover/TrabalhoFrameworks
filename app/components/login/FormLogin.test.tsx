import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import FormLogin from '@/components/login/FormLogin';

describe('FormLogin Component', () => {
  const navigationMock = { navigate: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve exibir erro quando o email é inválido', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<FormLogin navigation={navigationMock} />);

    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');

    await act(async () => {
      fireEvent.changeText(emailInput, 'emailinvalido');
      fireEvent.changeText(senhaInput, '123456789');
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByText('Por favor, insira um e-mail válido.')).toBeTruthy();
    });
  });

  test('deve exibir erro quando a senha tem menos de 8 caracteres', async () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText, getByTestId } = render(<FormLogin navigation={navigationMock} />);
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // Número de caracteres na senha < 8
    fireEvent.changeText(emailInput, 'renato@gmail.com');
    fireEvent.changeText(senhaInput, '1234567');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
        expect(getByText('A senha deve ter no mínimo 8 caracteres.')).toBeTruthy();
    });
  });

  test('deve exibir erro quando o e-mail ou a senha estão incorretos', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<FormLogin navigation={navigationMock} />);
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // Senha Errada
    fireEvent.changeText(emailInput, 'renato@gmail.com');
    fireEvent.changeText(senhaInput, 'senhaerrada');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
        expect(getByText('E-mail ou senha incorretos!')).toBeTruthy();
    });
  });

  test('deve exibir erro quando o e-mail ou a senha estão incorretos', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<FormLogin navigation={navigationMock} />);
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // E-mail Incorreto
    fireEvent.changeText(emailInput, 'renato2@gmail.com');
    fireEvent.changeText(senhaInput, '123456789');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
        expect(getByText('E-mail ou senha incorretos!')).toBeTruthy();
    });
  });

  test('deve redirecionar para a tela Home quando o e-mail e a senha estão corretos', async () => {
    const { getByPlaceholderText, getByTestId } = render(<FormLogin navigation={navigationMock} />);
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    fireEvent.changeText(emailInput, 'renato@gmail.com');
    fireEvent.changeText(senhaInput, '123456789');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith('Home', { email: 'renato@gmail.com' });
    });
  });

});
