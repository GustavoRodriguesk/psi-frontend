import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from 'react'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useMoodStore } from '../stores/useMoodStore'
import { fetchAuth } from '../utils/fetchAuth'

export default function UpdateMood() {
  const { moods, updateMood } = useMoodStore()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const mood = moods.find((item) => item.id === id)

  const [txtTexto, setTxtTexto] = useState(mood?.texto || '')
  const [txtSentimento, setTxtSentimento] = useState(
    mood?.sentimento?.toString() || ''
  )

  const handleUpdateMood = async () => {
    const updatedMood = {
      texto: txtTexto,
      sentimento: parseInt(txtSentimento, 10)
    }

    const response = await fetchAuth(`http://localhost:5000/mood/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMood)
    })

    if (response.ok) {
      const data = await response.json()
      updateMood(data.mood)
      router.back()
      return
    }

    console.log('Erro ao atualizar mood')
  }

  return (
    <View style={styles.container}>
      <Text>Texto:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtTexto}
        value={txtTexto}
        placeholder="Como você está se sentindo?"
        placeholderTextColor="#DDDDDD"
      />

      <Text>Sentimento (número):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtSentimento}
        value={txtSentimento}
        placeholder="Ex: 1 (triste) até 5 (feliz)"
        keyboardType="numeric"
        placeholderTextColor="#DDDDDD"
      />

      <Button onPress={handleUpdateMood}>Atualizar</Button>
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
