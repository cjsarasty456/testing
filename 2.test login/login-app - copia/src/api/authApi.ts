export async function loginApi(username: string, password: string) {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error de red o servidor');
    }

    const data = await response.json();
    return data; // Debe ser { success: boolean, message: string }
  } catch (error) {
    return { success: false, message: 'Error al conectar con el servidor' };
  }
}
