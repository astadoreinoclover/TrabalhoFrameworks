import { AuthData } from '../contexts/Auth'

async function login(email: string, senha: string):Promise<AuthData> {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(senha === "123456789") {
                resolve({
                    token: 'test-token-fake',
                    email,
                    name: 'Renato',
                    numero: '(53) 991000000',
                    cpf: '000.000.000-00',
                    dataNascimento: '24/12/2001',
                    departament: 'Financeiro'
                })
            } else {
                reject(new Error('Credenciais invalidas'))
            }
        }, 500);
    })
}

export const authServise = {login}