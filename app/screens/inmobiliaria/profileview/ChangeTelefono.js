import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangeTelefono = () => {
    const [newTelefono, setNewTelefono] = React.useState('');

    const editTelefono = () => {
        console.log('edit telefono');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Mail de Usuario</Text>
            <TextInput
                mode="outlined"
                value={newTelefono}
                onChangeText={title => setNewTelefono(title)}
            />

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editTelefono}>
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

export default ChangeTelefono;