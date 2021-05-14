import { useEffect } from 'react'
import { useStore } from '../lib/zustand'
import 'dystopia/dist/dystopia.css'
import '../components/firacode.css'

const App = ({ Component, pageProps }) => {
  const setUser = useStore(store => store.setUser)
  const setUserLoading = useStore(store => store.setUserLoading)

  useEffect(() => {
    setUserLoading(true)
    fetch('/api/me')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(user => {
        setUserLoading(false)
        setUser(user)
      })
      .catch(error => {
        setUserLoading(false)
        setUser(null)
        console.error(error)
      })
  }, [])

  return <Component {...pageProps} />
}

export default App
