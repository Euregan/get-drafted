import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import SmallPlayer from '../../../components/SmallPlayer'
import NotFound from '../../404'

const AirtablePlayers = ({ airtablePlayers, existingPlayers }) => {
  const [importPending, setImportPending] = useState(false)
  const [importError, setImportError] = useState(null)

  const startImport = () => {
    setImportPending(true)
    setImportError(null)
    fetch('/api/players', {
      method: 'POST',
      body: JSON.stringify(playersToImport)
    })
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(result => {
        setImportPending(false)
      })
      .catch(error => {
        setImportError(error)
        setImportPending(false)
      })
  }

  if (process.env.NODE_ENV !== 'development') {
    return <NotFound />
  }

  const playersToImport = airtablePlayers
    .filter(player => player.steamId)
    .filter(
      player =>
        !existingPlayers.map(player => player.steamId).includes(player.steamId)
    )

  const playersWithMissingInfo = airtablePlayers.filter(
    player => !player.steamId
  )

  return (
    <AdminLayout title="Airtable - Players">
      <div className="rows">
        {playersToImport.length > 0 && (
          <div>
            <h3>
              Pending
              <button disabled={importPending} onClick={startImport}>
                Import
              </button>
            </h3>
            <ul>
              {playersToImport.map(player => (
                <li>
                  <SmallPlayer key={player.id} player={player} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3>Missing info</h3>
          <ul>
            {playersWithMissingInfo.map(player => (
              <li>
                <SmallPlayer key={player.id} player={player} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          gap: var(--padding);
        }

        li {
          display: flex;
          gap: var(--padding);
        }

        h3 {
          margin-bottom: var(--padding);
        }

        .rows {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--margin);
        }

        button {
          margin-left: var(--padding);
        }

        * + h2 {
          margin-top: var(--margin);
        }
      `}</style>
    </AdminLayout>
  )
}

export default AirtablePlayers

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
