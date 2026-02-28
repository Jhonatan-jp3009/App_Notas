import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const NotasUdeb = () => {
    const [nota, setNota] = useState('');
    const [error, setError] = useState('');
    const [notasGuardadas, setNotasGuardadas] = useState([]);

    const manejarCambioTexto = (texto) => {
        if (texto === '') {
            setNota(texto);
            return;
        }
        if (isNaN(texto)) {
            return;
        }
        if (texto.includes('.')) {
            const partes = texto.split('.'); 
            const decimales = partes[1];
            
            if (decimales.length > 2) {
                return;
            }
        }
        setNota(texto);
    };

    const agregarNota = () => {
        const valorNota = parseFloat(nota);

        if (isNaN(valorNota) || valorNota < 0 || valorNota > 5) {
            setError('La nota debe ser un número entre 0 y 5');
            return;
        }

        setError('');
        setNotasGuardadas([...notasGuardadas, valorNota]);
        setNota(''); // limpieza
    };

    const calcularPromedio = () => {
        if (notasGuardadas.length === 0) return "0.00"; // si no hay notas es 0
        const suma = notasGuardadas.reduce((total, actual) => total + actual, 0);
        const promedio = suma / notasGuardadas.length;
        return promedio.toFixed(2); // ver si hay 2 decimales
    };

    const borrarNotas = () => {
        setNotasGuardadas([]);
        setNota('');
        setError('');
    };

    const irLogin = () => {
        borrarNotas();
        router.back(); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nota:</Text>
            <TextInput
                style={styles.input}
                value={nota}
                onChangeText={manejarCambioTexto}
                placeholder="0.00"
                keyboardType="numeric" 
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Agregar Nota"
                onPress={agregarNota}
                color="#08ad10"
            />

            <Text style={styles.titulo}>Promedio: {calcularPromedio()}</Text>

            <ScrollView style={styles.listaContenedor}>
                {/* scrollview muestra las notas */}
                {notasGuardadas.map((notaGuardada, index) => (
                    <Text key={index} style={styles.notaItem}>
                        nota{index + 1}: {notaGuardada.toFixed(2)}
                    </Text> // toFixed 2deci
                ))}
            </ScrollView>

            <View style={styles.filaBotones}>
                <View style={styles.botonEspaciado}>
                    <Button
                        title="Borrar Todo"
                        onPress={borrarNotas}
                        color="#d32f2f" 
                    />
                </View>
                <View style={styles.botonEspaciado}>
                    <Button
                        title="Volver" 
                        onPress={irLogin}
                        color="#08ad10" 
                    />
                </View>
            </View>
        </View>
    );
}

export default NotasUdeb;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    error: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
    listaContenedor: {
        flex: 1,
        marginTop: 10,
    },
    notaItem: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        color: '#555',
    },
    filaBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botonEspaciado: {
        flex: 1,
        marginHorizontal: 5,
    }
});