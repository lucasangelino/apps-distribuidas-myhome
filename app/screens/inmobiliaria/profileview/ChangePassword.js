import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [hasError, setHasError] = React.useState(false); // [1

    const editPassword = () => {
        if (newPassword != confirmNewPassword) {
            console.log('las contraseñas no coinciden');
            setHasError(true);
            return;
        }
        console.log('edit password');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Mail de Usuario</Text>
            <TextInput
                mode="outlined"
                value={currentPassword}
                onChangeText={currentPas => setCurrentPassword(currentPas)}
            />

            <TextInput
                mode="outlined"
                value={newPassword}
                onChangeText={password => setNewPassword(password)}
            />

            <TextInput
                mode="outlined"
                value={confirmNewPassword}
                onChangeText={confPassword => setConfirmNewPassword(confPassword)}
            />

            {
                hasError && <Text style={styles.hasError}>Las contraseñas no coinciden</Text>
            }

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editPassword}>
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
    },
    hasError: {
        color: 'red',
    }
});

export default ChangePassword;