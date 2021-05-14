import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useStore } from '../lib/zustand'
import { Page, Loading, Crt, Flexbox } from 'dystopia'
import Avatar from '../components/Avatar'

const Layout = ({ children }) => {
  const userLoading = useStore(store => store.userLoading)
  const user = useStore(store => store.user)

  const [actions, setActions] = useState([<Crt key="crt" init={true} />])

  useEffect(() => {
    let actions = []

    if (user) {
      actions.push(
        <Link key="profile" href="/profile">
          <a className="profile">
            <Flexbox direction="row" gap="small">
              <Avatar user={user} size="small" />
              <span>{user.name}</span>
            </Flexbox>
          </a>
        </Link>
      )
    }
    if (userLoading) {
      actions.push(<Loading key="loading" />)
    }
    actions.push(<Crt key="crt" init={true} />)
    if (!user && !userLoading) {
      actions.push(
        <a key="login" href="/api/auth">
          <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png" />
        </a>
      )
    }

    setActions(actions)
  }, [user, userLoading])

  return (
    <Page
      menu={[
        <Link key="home" href="/">
          <a>
            <h1>get Drafted</h1>
          </a>
        </Link>,
        <Link key="information" href="/information">
          <a>Information</a>
        </Link>,
        <Link key="players" href="/players">
          <a>Players</a>
        </Link>,
        <Link key="teams" href="/teams">
          <a>Teams</a>
        </Link>,
        <Link key="matches" href="/matches">
          <a>Matches</a>
        </Link>
      ]}
      actions={actions}
    >
      {children}
    </Page>
  )
}

export default Layout
