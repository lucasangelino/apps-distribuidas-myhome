import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangeDireccion = () => {
    const [newDireccion, setNewDireccion] = React.useState('');

    const editDireccion = () => {
        console.log('edit direccion');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Direccion</Text>
            <TextInput
                mode="outlined"
                value={newDireccion}
                onChangeText={direccion => setNewDireccion(direccion)}
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