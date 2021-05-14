import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import SmallPlayer from '../components/SmallPlayer'
import NotFound from './404'

const Admin = ({ airtablePlayers, existingPlayers }) => {
  const playersWithMissingInfo = airtablePlayers.filter(
    player => !player.steamId
  )

  if (process.env.NODE_ENV !== 'development') {
    return <NotFound />
  }

  return (
    <AdminLayout title="Dashboard">
      <h3>Airtable players with missing info</h3>
      <ul>
        {playersWithMissingInfo.map(player => (
          <li>
            <SmallPlayer key={player.id} player={player} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        h3 {
          margin-bottom: var(--padding);
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: var(--padding);
        }
      `}</style>
    </AdminLayout>
  )
}

export default Admin

export async function getServerSideProps(context) {
  const [players, weapons, existingPlayers] = await Promise.all([
    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/players`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(players =>
        players.records.map(player => ({
          ...player,
          ...player.fields
        }))
      ),
    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/weapons`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(weapons =>
        weapons.records.map(weapon => ({
          ...weapon,
          ...weapon.fields
        }))
      ),
    fetch(`http://localhost:3000/api/players`).then(res => res.json())
  ])

  return {
    props: {
      airtablePlayers: players.map(player => ({
        ...player,
        weapons: (player.weapons || []).map(id =>
          weapons.find(weapon => weapon.id === id)
        )
      })),
      existingPlayers
    }
  }
}
