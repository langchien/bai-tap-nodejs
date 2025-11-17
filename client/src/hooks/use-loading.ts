import { create } from 'zustand'

interface State {
  isLoading: boolean
}

interface Actions {
  setLoading: (isLoading: boolean) => void
}

export const useLoading = create<State & Actions>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set(() => ({ isLoading })),
}))
