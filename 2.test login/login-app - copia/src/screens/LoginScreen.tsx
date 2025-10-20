import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginApi } from '../api/authApi';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await loginApi(email, password);
    setLoading(false);

    if (result.success) {
      navigation.navigate('Home');
    } else {
      setError(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Iniciar sesión</Text>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="input-email"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="input-password"
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator testID="loading-indicator" />
      ) : (
        <Button title="Ingresar" onPress={handleLogin} />
      )}
      {error ? <Text testID="error-message">{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 8,
    width: '100%',
    borderRadius: 5,
  },
});
