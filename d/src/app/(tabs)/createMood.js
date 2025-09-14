import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from "react"
import Button from '../../components/Button'
import { useRouter } from 'expo-router'
import { useMoodStore } from '../../stores/useMoodStore'
import { fetchAuth } from '../../utils/fetchAuth'

export default function CreateMood() {
  const { addMood } = useMoodStore()
  const router = useRouter()

  const [txtTexto, setTxtTexto] = useState('')
  const [txtSentimento, setTxtSentimento] = useState('')

  const handleCreateMood = async () => {
    const mood = {
      texto: txtTexto,
      sentimento: parseInt(txtSentimento, 10) // transforma em número
    }

    const response = await fetchAuth('http://localhost:5000/mood', {
      method: 'POST',
      body: JSON.stringify(mood)
    })

    if (response.ok) {
      const data = await response.json()
      addMood(data.mood)
      router.replace('/home')
      return
    }

    console.log('Erro ao criar mood')
  }

  return (
    <View style={styles.container}>
      <Text>Texto:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtTexto}
        value={txtTexto}
        placeholder='Como você está se sentindo?'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Sentimento (número):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtSentimento}
        value={txtSentimento}
        placeholder='Ex: 1 (triste) até 5 (feliz)'
        keyboardType='numeric'
        placeholderTextColor='#DDDDDD'
      />

      <Button onPress={handleCreateMood}>Cadastrar</Button>
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
