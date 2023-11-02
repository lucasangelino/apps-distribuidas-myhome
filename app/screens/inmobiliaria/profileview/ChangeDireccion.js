import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangeDireccion = () => {
    const [newCalleAlture, setNewCalleAlture] = React.useState('');
    const [newPiso, setNewPiso] = React.useState('');
    const [newLocalidad, setNewLocalidad] = React.useState('');
    const [newCodigoPostal, setNewCodigoPostal] = React.useState('');
    const [newProvincia, setNewProvincia] = React.useState('');

    const editDireccion = () => {
        console.log('edit direccion');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Direccion</Text>

            <TextInput
                mode="outlined"
                value={newCalleAlture}
                onChangeText={calleAltura => setNewCalleAlture(calleAltura)}
            />

            <TextInput
                mode="outlined"
                value={newPiso}
                onChangeText={piso => setNewPiso(piso)}
            />

            <TextInput
                mode="outlined"
                value={newLocalidad}
                onChangeText={localidad => setNewLocalidad(localidad)}
            />

            <TextInput
                mode="outlined"
                value={newCodigoPostal}
                onChangeText={codigoPostal => setNewCodigoPostal(codigoPostal)}
            />

            <TextInput
                mode="outlined"
                value={newProvincia}
                onChangeText={provincia => setNewProvincia(provincia)}
            />

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editDireccion}>
                Alguiler
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        direction: 'column',
    }
});

export default ChangeDireccion;