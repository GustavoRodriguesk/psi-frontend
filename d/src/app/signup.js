import { View, StyleSheet, Text, TextInput, Alert } from 'react-native'
import { useState } from "react"
import Button from '../components/Button'
import { useRouter } from 'expo-router'

export default function SignUp(){

    const router = useRouter()

    const [txtNome, setTxtNome] = useState('')
    const [txtSobrenome, setTxtSobrenome] = useState('')
    const [txtCPF, setTxtCPF] = useState('')
    const [txtNascimento, setTxtNascimento] = useState('')
    const [txtGenero, setTxtGenero] = useState('')
    const [txtAvatar, setTxtAvatar] = useState('')
    const [txtPass, setTxtPass] = useState('')

    const handleCreateAccount = async () => {
        const user = {
            nome: txtNome,
            sobrenome: txtSobrenome,
            cpf: txtCPF,
            nascimento: new Date(txtNascimento),
            genero: txtGenero,
            photo: txtAvatar,
            password: txtPass,
        }
    
        try {
            const response = await fetch('http://localhost:5000/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            })
    
            if(response.ok){
                await response.json()
                Alert.alert('Usuário Criado com Sucesso!')
                setTxtNome('')
                setTxtSobrenome('')
                setTxtCPF('')
                setTxtNascimento('')
                setTxtGenero('')
                setTxtAvatar('')
                setTxtPass('')
                router.back()
            } else {
                const data = await response.json()
                Alert.alert('Erro ao Criar Usuário', data?.error || 'Tente novamente')
                console.log(data?.error)
            }
        } catch (err) {
            Alert.alert('Erro de conexão', 'Não foi possível acessar o servidor')
            console.log(err)
        }
    }

    return( 
        <View style={styles.container}>
          <Text>Nome:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtNome}
            value={txtNome}
            placeholder='Digite seu nome...'
            placeholderTextColor='#AAAAAA'
          />
          <Text>Sobrenome:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtSobrenome}
            value={txtSobrenome}
            placeholder='Digite seu sobrenome...'
            placeholderTextColor='#AAAAAA'
          />
          <Text>CPF:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtCPF}
            value={txtCPF}
            keyboardType='numeric'
            placeholder='Digite seu CPF...'
            placeholderTextColor='#AAAAAA'
          />
          <Text>Data de Nascimento:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtNascimento}
            value={txtNascimento}
            placeholder='AAAA-MM-DD'
            placeholderTextColor='#AAAAAA'
          />
          <Text>Gênero:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtGenero}
            value={txtGenero}
            placeholder='Masculino/Feminino/Outro'
            placeholderTextColor='#AAAAAA'
          />
          <Text>Avatar URL:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtAvatar}
            value={txtAvatar}
            keyboardType='url'
            placeholder='Link da foto (opcional)'
            placeholderTextColor='#AAAAAA'
          />
          <Text>Senha:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtPass}
            value={txtPass}
            secureTextEntry={true}
            placeholder='Digite sua senha...'
            placeholderTextColor='#AAAAAA'
          />
          <Button onPress={handleCreateAccount}>Cadastrar</Button>
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
    borderRadius: 5
  }
})
