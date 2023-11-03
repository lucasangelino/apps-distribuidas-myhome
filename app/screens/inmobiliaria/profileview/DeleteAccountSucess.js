import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Button } from 'react-native';

const DeleteAccountSucess = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <Ionicons name="checkmark-circle-outline" size={50} color="#EB6440" />
                <Text>Cuenta eliminada con exito</Text>
            </View>
            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={() => navigation.navigate("Logout")}>
                Eliminar
            </Button>
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
});

export default DeleteAccountSucess;