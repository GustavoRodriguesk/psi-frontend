import { Pressable, StyleSheet, Text } from "react-native"

export default function Button({onPress, children}){
    return(
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: ({pressed}) => [{
        backgroundColor: pressed ? '#065f21ff': '#01f922ff',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 30
    }]
})