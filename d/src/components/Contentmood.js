import { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CardMood from './CardMood' // precisa existir
import { useMoodStore } from '../stores/useMoodStore'
import { fetchAuth } from '../utils/fetchAuth'

export default function Content() {
  const { moods: moods, setMoods: setMoods } = useMoodStore()

  useEffect(() => {
    const getMoods = async () => {
      const response = await fetchAuth('http://localhost:5000/mood/list')
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMoods(data.moods)
        return
      }
      console.log('Erro ao carregar moods')
    }

    getMoods()
    return
  }, [])

  return (
    <View style={styles.content}>
      {moods.length === 0 && <Text>Loading...</Text>}

      {moods.map((mood) => (
        <CardMood
          key={mood.id}
          id={mood.id}
          texto={mood.texto}
          sentimento={mood.sentimento}
          createdAt={mood.createdAt}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: 10,
    padding: 15
  }
})
