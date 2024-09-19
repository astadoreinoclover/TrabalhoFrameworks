import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "../(screens)/HomeScreen";
import Tasks from "../(screens)/Tasks";

const Stack = createNativeStackNavigator();

export function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Tasks" component={Tasks} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}