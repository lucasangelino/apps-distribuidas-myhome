import React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const DeactivateAccount = () => {
    const [visible, setVisible] = React.useState(true);

    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: '#000', padding: 20 };

    const deactivateAccount = async () => {
        console.log('deactivate account');
    }

    return (
        <PaperProvider>
            <Portal style={styles.container}>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Estas seguro que deseas eliminar tu cuenta?</Text>
                </Modal>
            </Portal>
            <Button
                mode={'contained'}
                color="#EB6440"
                onPress={hideModal}>
                Cancelar
            </Button>

            <Button
                mode={'outlined'}
                color="#EB6440"
                onPress={deactivateAccount}>
                Eliminar
            </Button>


        </PaperProvider>
    );
};

export default DeactivateAccount;