import { authServise } from "@/services/AuthService";
import React, { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";

 export interface AuthData {
    token:string;
        email:string;
        name: string;
}

interface AuthContextData {
    authData?: AuthData;
    login: (email:string, senha:string) => Promise<AuthData | undefined>;
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | undefined>(undefined);

    async function login(email:string, senha: string): Promise<AuthData | undefined> {
        try {
            const auth = await authServise.login(email, senha);
            setAuthData(auth);
            return auth;
        } catch (error) {
            // Alert.alert(Error.arguments)
            return undefined;
        }
    }

    async function logout(): Promise<void> {
        setAuthData(undefined);
        return;
    }
    return(
        <AuthContext.Provider value={{authData, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}