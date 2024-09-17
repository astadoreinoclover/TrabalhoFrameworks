import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import FormLogin from '@/components/login/FormLogin';
import { AuthContext } from '../../contexts/Auth';

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
    const loginMock = jest.fn().mockResolvedValue(null); // Simulando falha de login
  
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={{ login: loginMock, logout: logoutMock }}>
        <FormLogin navigation={navigationMock} />
      </AuthContext.Provider>
    );
    
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // Simular e-mail incorreto
    fireEvent.changeText(emailInput, 'renato2@gmail.com');
    fireEvent.changeText(senhaInput, '123456789');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      // Verificar se a mensagem de erro correta está sendo exibida
      expect(getByText('E-mail ou senha incorretos!')).toBeTruthy();
    });
  });

  test('deve exibir erro quando o e-mail ou a senha estão incorretos', async () => {
    const loginMock = jest.fn().mockResolvedValue(null); // Simulando falha de login
  
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={{ login: loginMock, logout: logoutMock }}>
        <FormLogin navigation={navigationMock} />
      </AuthContext.Provider>
    );
    
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // Simular senha incorreta
    fireEvent.changeText(emailInput, 'renato@gmail.com');
    fireEvent.changeText(senhaInput, 'senhaerrada');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      // Verificar se a mensagem de erro correta está sendo exibida
      expect(getByText('E-mail ou senha incorretos!')).toBeTruthy();
    });
  });

  test('deve redirecionar para a tela Home quando o e-mail e a senha estão corretos', async () => {
    const loginMock = jest.fn().mockResolvedValue({ token: 'fake-token' }); // Simulando sucesso de login
  
    const { getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={{ login: loginMock, logout: logoutMock }}>
        <FormLogin navigation={navigationMock} />
      </AuthContext.Provider>
    );
    
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByTestId('loginButton');
  
    // Simular e-mail e senha corretos
    fireEvent.changeText(emailInput, 'renato@gmail.com');
    fireEvent.changeText(senhaInput, 'senha123456');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      // Verificar se a navegação para a tela Home foi chamada corretamente
      expect(navigationMock.navigate).toHaveBeenCalledWith('Home', { email: 'renato@gmail.com' });
    });
  });

});
function logoutMock(): Promise<void> {
  throw new Error('Function not implemented.');
}

