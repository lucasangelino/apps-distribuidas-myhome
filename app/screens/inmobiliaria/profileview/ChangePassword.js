import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = React.useState('');
    const editPassword = () => {
        console.log('edit password');
    }

    return (
        <View style={styles.container}>
            <Text>Cambiar Mail de Usuario</Text>
            <TextInput
                mode="outlined"
                value={newPassword}
                onChangeText={title => setNewPassword(title)}
            />

            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={editPassword}>
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

export default ChangePassword;