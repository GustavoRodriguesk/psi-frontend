import { create } from "zustand"

export const useAppointmentStore = create((set) => ({
    appointments: [],

    addAppointment: (newAppointment) => set((state) => ({ appointments: [newAppointment, ...state.appointments]})),
    setAppointments: (newAppointments) => set({ appointments: newAppointments }),
    deleteAppointment: (id) => set((state) => ({ appointments: state.appointments.filter((appointment) => appointment.id !== id)})),
    updateAppointment: (newAppointment) => set((state) => ({ appointments: state.appointments.map((appointment) => appointment.id === newAppointment.id ? newAppointment : appointment)}))
}))