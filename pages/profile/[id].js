import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card } from 'dystopia'
import Layout from '../../components/Layout'
import Avatar from '../../components/Avatar'
import SmallWeapon from '../../components/SmallWeapon'
import SmallTeam from '../../components/SmallTeam'
import NotFound from '../404'

const Profile = () => {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/user/${id}`)
        .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
        .then(weapons => {
          setUser(weapons)
          setUserLoading(false)
        })
        .catch(error => {
          setUserError(error)
          setUserLoading(false)
        })
    }
  }, [id])

  if (!user && !userLoading) return <NotFound />

  return (
    <Layout>
      {user && (
        <Card>
          <div className="header">
            <Avatar user={user} size="large" />
            <div>
              <h2>{user.name}</h2>
              {user.weapons.data.map(weapon => (
                <SmallWeapon key={weapon._id} weapon={weapon} />
              ))}
            </div>
          </div>
          <style jsx>{`
            .header {
              display: flex;
              gap: var(--padding);
            }
          `}</style>
          {user.team && <SmallTeam team={user.team} />}
        </Card>
      )}
    </Layout>
  )
}
export default Profile
