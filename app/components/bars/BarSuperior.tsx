import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const BarSuperior = () => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.top, {width: width}]}>
            <SimpleLineIcons name="logout" size={24} color="red" />
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: "black",
        height: 300
    }
});

export default BarSuperior