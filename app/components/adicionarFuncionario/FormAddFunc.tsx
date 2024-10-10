import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import InputAddFunc from './RenderAddFunc';
import ProgressBar from './ProgressBar';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';


export default function FormAddFunc() {
    const { width } = useWindowDimensions();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [funcao, setFuncao] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [complement, setComplement] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');

    const handleSubmit = () => {
        if (!nome || !sobrenome || !departamento || !funcao || !email || !phone || !neighborhood || !street || !complement || !houseNumber || !dataNasc || !cpf) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        navigation.navigate('Funcionarios')
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Nome" value={nome} setValue={setNome} />
                        <InputAddFunc label="Sobrenome" value={sobrenome} setValue={setSobrenome} />
                        <InputAddFunc label="Data Nasc." value={dataNasc} setValue={setDataNasc} />
                        <InputAddFunc label="CPF" value={cpf} setValue={setCpf} />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Email" value={email} setValue={setEmail} />
                        <InputAddFunc label="Telefone" value={phone} setValue={setPhone} />
                        <InputAddFunc label="Departamento" value={departamento} setValue={setDepartamento} />
                        <InputAddFunc label="Função" value={funcao} setValue={setFuncao} />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.containerInputs}>
                        <InputAddFunc label="Bairro" value={neighborhood} setValue={setNeighborhood} />
                        <InputAddFunc label="Rua" value={street} setValue={setStreet} />
                        <InputAddFunc label="Complemento" value={complement} setValue={setComplement} />
                        <InputAddFunc label="Número" value={houseNumber} setValue={setHouseNumber} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={[styles.posicao, { width: width >= 768 ? width * 0.5 : width * 0.9, paddingTop:50}]}>
            <Text style={[styles.title, { fontSize: width >= 768 ? 30 : 22 }]}>Cadastro de Funcionário</Text>
            
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {renderStep()}
            
            <View style={styles.buttonContainer}>
                {currentStep > 1 && (
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.2 : width * 0.3 }]}
                        onPress={prevStep}
                    >
                        <Text style={styles.buttonText}>Anterior</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { width: width >= 768 ? width * 0.2 : width * 0.3 }]}
                        onPress={currentStep < totalSteps ? nextStep : handleSubmit}
                    >
                        <Text style={styles.buttonText}>{currentStep < totalSteps ? 'Próximo' : 'Concluir'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    posicao: {
        position: 'relative',
    },
    title: {
        color: '#2C3E50',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    containerInputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#8A79AF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});