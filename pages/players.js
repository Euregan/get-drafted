import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Player from '../components/Player'

const Players = ({ players }) => {
  const [nameFilter, setNameFilter] = useState('')
  const [deckingFilter, setDeckingFilter] = useState(false)
  const [playerFilter, setPlayerFilter] = useState(false)
  const [substituteFilter, setSubstituteFilter] = useState(false)

  return (
    <Layout>
      <div className="players-page">
        <aside>
          <label>
            Name
            <input
              type="text"
              value={nameFilter}
              onChange={event => setNameFilter(event.target.value)}
            />
          </label>
          <label>
            Decking
            <input
              type="checkbox"
              checked={deckingFilter}
              onChange={() => setDeckingFilter(!deckingFilter)}
            />
          </label>
          <label>
            Player
            <input
              type="checkbox"
              checked={playerFilter}
              onChange={() => setPlayerFilter(!playerFilter)}
            />
          </label>
          <label>
            Substitute
            <input
              type="checkbox"
              checked={substituteFilter}
              onChange={() => setSubstituteFilter(!substituteFilter)}
            />
          </label>
        </aside>
        <section>
          <ul className="players">
            {players
              .filter(
                player =>
                  nameFilter === '' ||
                  player.name.toLowerCase().includes(nameFilter.toLowerCase())
              )
              .filter(player => !deckingFilter || player.decking)
              .filter(player => !playerFilter || player.main)
              .filter(player => !substituteFilter || player.substitute)
              .sort((a, b) => a.fields.name.localeCompare(b.fields.name))
              .map(player => (
                <li key={player.id}>
                  <Player player={player} />
                </li>
              ))}
          </ul>
        </section>
        <style jsx>{`
          .players-page {
            display: flex;
            gap: var(--margin);
          }

          section {
            flex-grow: 1;
          }

          .players {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: var(--margin);
          }

          aside {
            display: flex;
            flex-direction: column;
            gap: var(--padding);
          }
        `}</style>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const [players, weapons] = await Promise.all([
    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/players`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    }).then(res => res.json()),
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
      )
  ])

  return {
    props: {
      players: players.records.map(player => ({
        ...player,
        ...player.fields,
        weapons: (player.fields.weapons || []).map(id =>
          weapons.find(weapon => weapon.id === id)
        )
      }))
    }
  }
}

export default Players
