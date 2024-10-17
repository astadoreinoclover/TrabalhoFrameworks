import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions, Text } from 'react-native';

interface InputAddFuncProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    onChange?: (value: string) => void; // Tornar onChange opcional
}

const InputCPF: React.FC<InputAddFuncProps> = ({ label, value, setValue, onChange }) => {
    const { width } = useWindowDimensions();

    // Função para lidar com a mudança no valor do input
    const handleChange = (text: string) => {
        // Remove todos os caracteres não numéricos
        const onlyNumbers = text.replace(/\D/g, '');
    
        // Limita a 11 caracteres
        if (onlyNumbers.length <= 11) {
            // Formata o CPF
            let formattedCpf = onlyNumbers;
    
            // Formatação do CPF (XXX.XXX.XXX-XX)
            if (onlyNumbers.length > 9) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6, 9)}-${onlyNumbers.slice(9, 11)}`;
            } else if (onlyNumbers.length > 6) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6, 9)}`;
            } else if (onlyNumbers.length > 3) {
                formattedCpf = `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}`;
            } else if (onlyNumbers.length > 0) {
                formattedCpf = onlyNumbers.slice(0, 3);
            }
    
            // Atualiza o estado e chama a função onChange, se fornecida
            setValue(formattedCpf);
            if (onChange) {
                onChange(formattedCpf);
            }
        }
    };
    

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, { padding: width >= 768 ? 10 : 5 }]}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value} 
                onChangeText={handleChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        padding: 10,
        color: '#2C3E50',
        backgroundColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
    },
});

export default InputCPF;
