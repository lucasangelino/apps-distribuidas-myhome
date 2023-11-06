import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangeEmailContacto = () => {
    const [newEmail, setNewEmail] = React.useState('');
    const editEmail = () => {
        console.log('edit email');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Mail de contacto</Text>
            <TextInput
                mode="outlined"
                value={newEmail}
                onChangeText={title => setNewEmail(title)}
            />

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editEmail}>
                Alquiler
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

export default ChangeEmailContacto;