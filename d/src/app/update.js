import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from 'react'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useAppointmentStore } from '../stores/useAppointmentStore'
import { fetchAuth } from '../utils/fetchAuth'

export default function Update() {
  const { appointments, updateAppointment } = useAppointmentStore()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const appointment = appointments.find((item) => item.id === id)

  const [Date, txtSetDate] = useState(appointment?.date || '')
  const [txtStatus, txtSetStatus] = useState(appointment?.status || '')
  const [txtMessage, txtSetMessage] = useState(appointment?.message || '')

  const handleUpdateAppointment = async () => {
    const updatedAppointment = {
      date: new Date().toISOString(),
      status: txtStatus,
      message: txtMessage
    }

    const response = await fetchAuth(`http://localhost:5000/appointment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedAppointment)
    })

    if (response.ok) {
      const data = await response.json()
      updateAppointment(data.appointment)
      router.back()
      return
    }

    console.log('Erro ao atualizar appointment')
    return
  }

  return (
    <View style={styles.container}>
      <Text>Data e Hora:</Text>
      <TextInput
        style={styles.input}
        onChangeText={txtSetDate}
        value={date}
        placeholder="YYYY-MM-DDTHH:MM"
        placeholderTextColor="#DDDDDD"
      />

      <Text>Status:</Text>
      <TextInput
        style={styles.input}
        onChangeText={txtSetStatus}
        value={txtStatus}
        placeholder="Ex: confirmado"
        placeholderTextColor="#DDDDDD"
      />

      <Text>Mensagem (opcional):</Text>
      <TextInput
        style={styles.input}
        onChangeText={txtSetMessage}
        value={txtMessage}
        placeholder="Mensagem"
        placeholderTextColor="#DDDDDD"
      />

      <Button onPress={handleUpdateAppointment}>Atualizar</Button>
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
