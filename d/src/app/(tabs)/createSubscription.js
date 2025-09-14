import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from "react"
import Button from '../../components/Button'
import { useRouter } from 'expo-router'
import { useSubscriptionStore } from '../../stores/useSubscriptionStore'
import { fetchAuth } from '../../utils/fetchAuth'

export default function CreateSubscription() {
  const { addSubscription } = useSubscriptionStore()
  const router = useRouter()

  const [txtStatus, setTxtStatus] = useState('')
  const [txtStartDate, setTxtStartDate] = useState('')
  const [txtEndDate, setTxtEndDate] = useState('')
  const [txtStripeId, setTxtStripeId] = useState('')

  const handleCreateSubscription = async () => {
    const subscription = {
      status: txtStatus,
      startDate: new Date(txtStartDate).toISOString(),
      endDate: new Date(txtEndDate).toISOString(),
      stripeId: txtStripeId
    }

    const response = await fetchAuth('http://localhost:5000/subscription', {
      method: 'POST',
      body: JSON.stringify(subscription)
    })

    if (response.ok) {
      const data = await response.json()
      addSubscription(data.subscription)
      router.replace('/home')
      return
    }

    console.log('Erro ao criar subscription')
  }

  return (
    <View style={styles.container}>
      <Text>Status:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStatus}
        value={txtStatus}
        placeholder='Ex: ativo, cancelado...'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Data de Início:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStartDate}
        value={txtStartDate}
        placeholder='YYYY-MM-DD'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Data de Fim:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtEndDate}
        value={txtEndDate}
        placeholder='YYYY-MM-DD'
        placeholderTextColor='#DDDDDD'
      />

      <Text>Stripe ID:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStripeId}
        value={txtStripeId}
        placeholder='ID do Stripe'
        placeholderTextColor='#DDDDDD'
      />

      <Button onPress={handleCreateSubscription}>Cadastrar</Button>
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
