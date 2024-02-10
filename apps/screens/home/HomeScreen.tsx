import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import LoadingSpiner from '@/apps/components/loading';

const HomeScreen = (props: NativeStackScreenProps<RootStackProps>) => {
    const [loading,setLoading] = useState(false);
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
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            props.navigation.navigate("Board");
                        },2*1000);
                    }}
                />
            </View>
            <LoadingSpiner loading={loading} />
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