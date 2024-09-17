import React, { useContext } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { AuthContext } from '@/contexts/Auth';

const BarSuperior = () => {
    const { width } = useWindowDimensions();
    const authContext = useContext(AuthContext);

    function logout() {
        authContext.logout()
    }
    return (
        <View style={[styles.top, {width: width}]}>
            <SimpleLineIcons name="logout" size={24} color="red" onPress={logout} />
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