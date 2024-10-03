import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LockButton: React.FC = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;

    const animatedWidth = useRef(new Animated.Value(isLargeScreen ? 50 : 100)).current; // Tamanho inicial
    const [isHovered, setIsHovered] = useState(false);
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    // Função para animar o botão
    const animateButton = (expand: boolean) => {
        if (expand) {
            // Expandir
            Animated.timing(animatedWidth, {
                toValue: isLargeScreen ? 200 : 100,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                // Inicia a animação de opacidade do texto após a expansão
                Animated.timing(animatedOpacity, {
                    toValue: 1, // Aparece o texto
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        } else {
            // Recolher
            Animated.timing(animatedOpacity, {
                toValue: 0, // Desaparece o texto
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                // Inicia a animação de largura após a opacidade ter diminuído
                Animated.timing(animatedWidth, {
                    toValue: isLargeScreen ? 50 : 100,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        }
    };

    return (
        <Pressable
            onPress={() => {}}
            onHoverIn={() => {
                if (isLargeScreen) {
                    setIsHovered(true);
                    animateButton(true);
                }
            }}
            onHoverOut={() => {
                if (isLargeScreen) {
                    setIsHovered(false);
                    animateButton(false);
                }
            }}
            style={styles.pressableContainer}
        >
            <Animated.View style={[styles.button, { width: isLargeScreen ? animatedWidth : 150 }]}>
                <View style={styles.iconContainer}>
                    <Svg width={isLargeScreen ? 24 : 16} height={isLargeScreen ? 24 : 16} viewBox="0 0 24 24" fill="none">
                        <Path 
                            d="M12 2a4 4 0 00-4 4v4H7a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V11a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 4a2 2 0 014 0v4h-4V6zm5 10a1 1 0 11-2 0 1 1 0 012 0zm-3 1v2h2v-2h-2z"
                            fill="#fff" // Cor do ícone em branco
                        />
                    </Svg>
                </View>
                {/* O texto aparece somente quando o botão está completamente expandido */}
                <Animated.Text style={[styles.buttonText, { fontSize: isLargeScreen ? 16 : 10, opacity: isLargeScreen ? animatedOpacity : 1 }]}>
                    Troca de senha
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        position: 'absolute', // Para posicionar no canto inferior direito
        bottom: 30, // Distância do fundo da tela
        right: 20, // Distância da borda direita da tela
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        height: 50,
        backgroundColor: '#2C3E50', // Cor de fundo do botão
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 50, // A largura do container do ícone agora é 50px
        height: 50, // A altura do container do ícone agora é 50px
        borderRadius: 25, // Mantém o formato circular
        backgroundColor: '#2C3E50', // Fundo do ícone igual ao botão
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
    },
    buttonText: {
        color: '#fff', // Cor do texto
        fontWeight: 'bold',
    },
});

export default LockButton;
