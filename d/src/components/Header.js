import { View, Text, StyleSheet} from 'react-native'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { useLoginStore } from '../stores/useLoginStore'

export default function Header(){

    const {nome, photo} = useLoginStore()

    return (
        <View style={styles.header}>
            <View style={styles.user}>
                <Image 
                    style={styles.photo}
                    source={photo} //Local
                    //source="https://photos.githubusercontent.com/u/4259630?v=4"
                />
                <Text style={styles.nome}>{nome}</Text>
            </View>
            <Link href="create-account">
                <Feather style={styles.menu} nome="plus" size={24} color="black" />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        //backgroundColor: "#899986",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    nome: {
        fontWeight: '600',
        fontSize: 18
    },
    menu: {
        padding: 10
    }
})