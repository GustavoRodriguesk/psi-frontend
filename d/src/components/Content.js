import { useEffect } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import CardAppointment from './CardAppointment'
import { useAppointmentStore } from '../stores/useAppointmentStore'
import { fetchAuth } from '../utils/fetchAuth'

export default function Content(){

  const { appointments, setAppointments } = useAppointmentStore()

  console.log('Appointments: ', appointments)
  
   useEffect(() => {
        const getAppointments = async () => {
            const response = await fetchAuth('http://localhost:5000/appointment/list')
            if(response.ok){
              const data = await response.json()
              console.log(data)
              setAppointments(data.appointments)
              return
            }
            console.log('Erro ao carregar appointments')
            return
        }

        getAppointments()
   }, [])


    return (
        <View style={styles.content}>
               
        { appointments.length === 0 && <Text>Loading...</Text>}

        {
          appointments.map( (appointment) => 
            <CardAppointment
              key={appointment.id}
              id={appointment.id} 
              status={appointment.status}
              message={appointment.message}
              date={appointment.date}
            /> 
          )
        }
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: 10,
        //backgroundColor: "#545656",
        padding: 15
        //justifyContent: 'center',
        //alignItems: 'center'
      }
})