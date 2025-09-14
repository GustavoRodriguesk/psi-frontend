import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from 'react'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useSubscriptionStore } from '../stores/useSubscriptionStore'
import { fetchAuth } from '../utils/fetchAuth'

export default function UpdateSubscription() {
  const { subscriptions, updateSubscription } = useSubscriptionStore()
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const subscription = subscriptions.find((item) => item.id === id)

  const [txtStatus, setTxtStatus] = useState(subscription?.status || '')
  const [txtStartDate, setTxtStartDate] = useState(subscription?.startDate || '')
  const [txtEndDate, setTxtEndDate] = useState(subscription?.endDate || '')
  const [txtStripeId, setTxtStripeId] = useState(subscription?.stripeId || '')

  const handleUpdateSubscription = async () => {
    const updatedSubscription = {
      status: txtStatus,
      startDate: new Date(txtStartDate).toISOString(),
      endDate: new Date(txtEndDate).toISOString(),
      stripeId: txtStripeId
    }

    const response = await fetchAuth(`http://localhost:5000/subscription/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedSubscription)
    })

    if (response.ok) {
      const data = await response.json()
      updateSubscription(data.subscription)
      router.back()
      return
    }

    console.log('Erro ao atualizar subscription')
  }

  return (
    <View style={styles.container}>
      <Text>Status:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStatus}
        value={txtStatus}
        placeholder="Ex: ativo, cancelado..."
        placeholderTextColor="#DDDDDD"
      />

      <Text>Data de Início:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStartDate}
        value={txtStartDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#DDDDDD"
      />

      <Text>Data de Fim:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtEndDate}
        value={txtEndDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#DDDDDD"
      />

      <Text>Stripe ID:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtStripeId}
        value={txtStripeId}
        placeholder="ID do Stripe"
        placeholderTextColor="#DDDDDD"
      />

      <Button onPress={handleUpdateSubscription}>Atualizar</Button>
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
