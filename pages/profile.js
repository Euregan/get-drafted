import { useState, useEffect } from 'react'
import { useStore } from '../lib/zustand'
import Layout from '../components/Layout'
import AdminLayout from '../components/AdminLayout'
import { Card, OptionList } from 'dystopia'
import Avatar from '../components/Avatar'
import NotFound from './404'

const Profile = () => {
  const userLoading = useStore(store => store.userLoading)
  const user = useStore(store => store.user)

  const [weapons, setWeapons] = useState([])
  const [weaponsLoading, setWeaponsLoading] = useState(true)
  const [weaponsError, setWeaponsError] = useState(null)

  const [selectedWeapons, setSelectedWeapons] = useState([])
  const [weaponSelectionChanged, setWeaponSelectionChanged] = useState(false)

  const updateWeapons = () => {
    fetch('/api/me/weapons', {
      method: 'POST',
      body: JSON.stringify({
        weaponsToAdd: selectedWeapons
          .filter(
            weapon =>
              !user.weapons.data.map(weapon => weapon._id).includes(weapon.id)
          )
          .map(weapon => weapon.id),
        weaponsToRemove: user.weapons.data
          .filter(
            weapon =>
              !selectedWeapons.map(weapon => weapon.id).includes(weapon._id)
          )
          .map(weapon => weapon._id)
      })
    })
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(weapons => {
        setSelectedWeapons(false)
      })
      .catch(error => {})
  }

  useEffect(
    () =>
      fetch('/api/weapons')
        .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
        .then(weapons => {
          setWeapons(weapons)
          setWeaponsLoading(false)
        })
        .catch(error => {
          setWeaponsError(error)
          setWeaponsLoading(false)
        }),
    []
  )

  useEffect(() => {
    if (user) {
      const userWeapons = user.weapons.data.map(weapon => ({
        id: weapon._id,
        name: weapon.name
      }))

      if (
        !userWeapons.every(weapon =>
          selectedWeapons.map(weapon => weapon.id).includes(weapon.id)
        )
      ) {
        setWeaponSelectionChanged(true)
        setSelectedWeapons(userWeapons)
      } else {
        setWeaponSelectionChanged(userWeapons.length !== selectedWeapons.length)
      }
    }
  }, [user, selectedWeapons])

  if (!user && !userLoading) return <NotFound />

  const ActualLayout = user && user.admin ? AdminLayout : Layout

  return (
    <ActualLayout>
      {user && (
        <Card>
          <Avatar user={user} size="large" />
          <h2>{user.name}</h2>
          {!weaponsLoading && !weaponsError && (
            <>
              <OptionList
                label="Weapons"
                values={selectedWeapons}
                options={weapons.map(weapon => ({
                  id: weapon._id,
                  name: weapon.name
                }))}
                onChange={setSelectedWeapons}
              />
              {weaponSelectionChanged && (
                <button onClick={updateWeapons}>Save</button>
              )}
            </>
          )}
        </Card>
      )}
    </ActualLayout>
  )
}

export default Profile
