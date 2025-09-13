import { create } from "zustand"

export const useSubscriptionStore = create((set) => ({
    subscriptions: [],

    addSubscription: (newSubscription) => set((state) => ({ subscriptions: [newSubscription, ...state.subscriptions]})),
    setSubscriptions: (newSubscriptions) => set({ subscriptions: newSubscriptions }),
    deleteSubscription: (id) => set((state) => ({ subscriptions: state.subscriptions.filter((subscription) => subscription.id !== id)})),
    updateSubscription: (newSubscription) => set((state) => ({ subscriptions: state.subscriptions.map((subscription) => subscription.id === newSubscription.id ? newSubscription : subscription)}))
}))