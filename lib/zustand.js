import create from 'zustand'

const useStore = create(set => ({
  user: null,
  userLoading: true,
  setUserLoading: loading => set(state => ({ userLoading: loading })),
  setUser: user => set(state => ({ user }))
}))

export { useStore }
