import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from "react"
import Button from '../../components/Button'
import { useRouter } from 'expo-router'
import { useAppointmentStore } from '../../stores/useAppointmentStore'
import { fetchAuth } from '../../utils/fetchAuth'

export default function CreateAppointment() {
  const { addAppointment } = useAppointmentStore()
  const router = useRouter()

  const [txtDate, setTxtDate] = useState('')
  const [txtStatus, setTxtStatus] = useState('')
  const [txtMessage, setTxtMessage] = useState('')

  const handleCreateAppointment = async () => {
    const appointment = {
      date: new Date(date).toISOString(), // garante que o formato esteja correto
      status: txtStatus,
      message: txtMessage
    }

    const response = await fetchAuth('http://localhost:5000/appointment', {
      method: 'POST',
      body: JSON.stringify(appointment)
    })

    if (response.ok) {
      const data = await response.json()
      addAppointment(data.appointment)
      router.replace('/home')
      return
    }

    console.log('Erro ao criar appointment')
    return
  }

  return (
    <View style={styles.container}>
      <Text>Data e Hora:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtDate}
        value={txtDate}
        placeholder='YYYY-MM-DDTHH:MM'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Status:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStatus}
        value={txtStatus}
        placeholder='Ex: confirmado'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Mensagem:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtMessage}
        value={txtMessage}
        placeholder='Digite uma mensagem...'
        placeholderTextColor='#DDDDDD'
      />

      <Button onPress={handleCreateAppointment}>Cadastrar</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
    color: '#000'
  }
})
