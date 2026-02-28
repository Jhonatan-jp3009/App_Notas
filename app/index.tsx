import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginUser = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [contra, setContraseña] = useState('');
    const [error, setError] = useState('');

    const sendLogin = () => {
        if ( contra !== "123456") {
            var numero = 12;
            setModalVisible(true)
            return;
        }
        Error('');
        router.navigate("../Notas");
    }
   

    return <View style={styles.container}>
        
        <Text style={styles.title}>Bienvenido a UdeB :)</Text>
        
       
        
        <TextInput
            style={styles.input}
            placeholder="Clave"
            value={contra}
            onChangeText={setContraseña}
            secureTextEntry
            placeholderTextColor="#998"
        />
         <Modal
            animationType="slide" // slide, fade, none
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Para Android
          >
            <View style={styles.modalView}>
              <Text>Clave incorrecta</Text>
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>

        <Button
            title="Ingresar"
            onPress={sendLogin}
            color="#08ad10"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
}

export default LoginUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    modalView: {
    
    marginVertical: 200, // solo arriba y abajo
    width: '50%', // ocupa todo el ancho
    backgroundColor: '#08ad10',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#fefefe',
    shadowOpacity: 0.25,
    elevation: 5,
    marginTop: 20
    
},
    title: {
        fontSize: 24,
        fontWeight: 'bold',//negri
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,//ancho
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

