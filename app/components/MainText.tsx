import React from 'react'
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { clamp } from 'react-native-reanimated';
import { calculateNewMassToMatchDuration } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

export default () => {
    return (
        <Text style={styles.h1Style}>
            A maior plataforma de Genéricos do Brasil!
        </Text>
    );
}


const { width, height } = useWindowDimensions();
const styles = StyleSheet.create({
    h1Style: {
        color: '#575757',
        marginTop: height * 0.22,
        //fontSize: '3vw',
        // textAlign: 'left',
        // marginLeft: width * 0.03
    }
// Ajustar h1
// https://reactnativeelements.com/docs/components/text

});