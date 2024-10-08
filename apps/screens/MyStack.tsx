import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home/HomeScreen';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import BoardScreen from './board/BoardScreen';
import ResultScreen from './result/ResultScreen';
import QuestionScreenTwo from './questions/QuestionScreenTwo';
export type RootStackProps = {
    Home: undefined,
    Question: undefined;
    Board: undefined;
    Result: undefined;
};

export type PropsNavieStack = NativeStackScreenProps<RootStackProps>;
const Stack = createStackNavigator<RootStackProps>();

const MyStack = () => {
    const theme = useTheme();
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{
                animationEnabled: false,
                gestureEnabled: true,
            }}>
                <Stack.Screen name='Home' component={HomeScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='Question' component={QuestionScreenTwo} options={{
                    title: 'Questions',
                    headerBackTitleVisible: false, // Hide back button text
                    headerTintColor: theme.colors.primary, // Back button color
                    headerStyle: {
                        backgroundColor: theme.colors.inversePrimary, // Header background color
                    },
                }} />
                <Stack.Screen name='Board' component={BoardScreen} options={{
                    title: 'Scoreboard',
                    headerLeft: () => null,
                    headerBackTitleVisible: false, // Hide back button text
                    headerTintColor: theme.colors.primary, // Back button color
                    headerStyle: {
                        backgroundColor: theme.colors.inversePrimary, // Header background color
                    },
                }} />
                <Stack.Screen name='Result' component={ResultScreen} options={{
                    title: 'Finish',
                    headerLeft: () => null,
                    headerShown: false,
                    headerBackTitleVisible: false, // Hide back button text
                    headerTintColor: theme.colors.primary, // Back button color
                    headerStyle: {
                        backgroundColor: theme.colors.inversePrimary, // Header background color
                    },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );


};

export default MyStack;