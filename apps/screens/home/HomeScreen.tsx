import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../../components/button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import useStoreBoard from '@/stores/useStoreBoard';
import LoadingSpiner from '@/apps/components/loading';

const HomeScreen = (props: NativeStackScreenProps<RootStackProps>) => {
    const { fetchBoard, boards } = useStoreBoard();
    useEffect(() => {
        fetchBoard().then(() => {
            if(boards.length){
                props.navigation.replace("Board");
            }
        });
    }, [boards, fetchBoard, props.navigation]);
    return (
        <View style={useStyles.container}>
            <View style={useStyles.imageContainer}>
                <Image
                    style={useStyles.image}
                    source={require("../../../assets/images/Questions-pana.png")}
                />
            </View>
            <View style={useStyles.buttonContainer}>
                <Button
                    label="Get Started"
                    style={{ alignSelf: "stretch" }}
                    onPress={() => {
                        props.navigation.navigate("Board");
                    }}
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const useStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 8,
        alignSelf: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 30,
        padding: 15
    },

});