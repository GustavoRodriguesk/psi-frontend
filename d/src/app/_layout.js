import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
            backgroundColor: "#fff"
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{title: "Entrar"}}/>
      <Stack.Screen name="signup" options={{title: "Cadastre-se"}}/>
      <Stack.Screen name="createAppointment" options={{title: "Adicionar Agendamento"}}/>
      <Stack.Screen name="updateAppointment" options={{title: "Editar Agendamento"}}/>
      <Stack.Screen name="createSubscription" options={{title: "Adicionar Mensalidade"}}/>
      <Stack.Screen name="updateSubscription" options={{title: "Editar Mensalidade"}}/>
      <Stack.Screen name="createMood" options={{title: "Adicionar Mood"}}/>
      <Stack.Screen name="updateMood" options={{title: "Editar Mood"}}/>
    </Stack>
  );
}