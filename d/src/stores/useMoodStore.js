import { create } from "zustand"

export const useMoodStore = create((set) => ({
    moods: [],

    addMood: (newMood) => set((state) => ({ moods: [newMood, ...state.moods]})),
    setMoods: (newMoods) => set({ moods: newMoods }),
    deleteMood: (id) => set((state) => ({ moods: state.moods.filter((mood) => mood.id !== id)})),
    updateMood: (newMood) => set((state) => ({ moods: state.moods.map((mood) => mood.id === newMood.id ? newMood : mood)}))
}))