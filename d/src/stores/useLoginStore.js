import { create } from "zustand"

export const useLoginStore = create((set) => ({
    accessToken: '',
    public_id: '',
    nome: '',
    photo: '', 
    cpf: '',

    login: (userLogin) => set({...userLogin}),
    logout: () => set({
        accessToken: '',
        public_id: '',
        nome: '',
        photo: '', 
        cpf: ''
    })
}))