import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useStoreAuth from '@/stores/useStorageAuth'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { PropsNavieStack, RootStackProps } from '@/apps/screens/MyStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


const AuthProvider = ({
    children,
    navigation
}: NativeStackScreenProps<RootStackProps,"Login"> & {children: React.ReactNode}) => {
    const {
        loggedIn
    } = useStoreAuth();

    if (!loggedIn) {
        navigation.navigate("Login");
    }
    return (
        <View>
            {children}
        </View>
    )
}

export default AuthProvider

const styles = StyleSheet.create({})