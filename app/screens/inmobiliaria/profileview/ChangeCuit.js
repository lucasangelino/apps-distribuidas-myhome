import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangeCuit = () => {
    const [newCuit, setNewCuit] = React.useState('');

    const editCuit = () => {
        console.log('edit cuit');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar CUIT</Text>
            <TextInput
                mode="outlined"
                value={newCuit}
                onChangeText={cuit => setNewCuit(cuit)}
            />

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editCuit}>
                CUIT
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

export default ChangeCuit;