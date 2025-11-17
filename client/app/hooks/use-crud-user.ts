import { toast } from 'sonner'
import { create } from 'zustand'
import { FAKE_USERS } from '../components/data'
import { type IUser } from '../components/schema'

interface State {
  users: IUser[]
  status: 'all' | 'active' | 'inactive'
  searchQuery?: string
}

interface Actions {
  addUser: (user: IUser) => void
  deleteUser: (id: number) => void
  resetUsers: () => void
  setStatus: (status: 'all' | 'active' | 'inactive') => void
  onSearchChange(query?: string): void
}

export const useCrudUser = create<State & Actions>((set) => ({
  users: FAKE_USERS,
  status: 'all',
  searchQuery: undefined,
  resetUsers: () => set({ users: FAKE_USERS }),
  addUser: (user: IUser) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  deleteUser: (id: number) =>
    set((state) => {
      toast.success('Người dùng đã được xóa thành công!')
      return {
        users: state.users.filter((user) => user.id !== id),
      }
    }),
  setStatus: (status: 'all' | 'active' | 'inactive') =>
    set((state) => ({
      ...state,
      status,
    })),
  onSearchChange: (query?: string) =>
    set((state) => ({
      ...state,
      searchQuery: query,
    })),
}))
