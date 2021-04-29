import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import LargePlayer from '../components/LargePlayer'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'

const Players = ({ players, weapons }) => {
  const [nameFilter, setNameFilter] = useState('')
  const [deckingFilter, setDeckingFilter] = useState(false)
  const [playerFilter, setPlayerFilter] = useState(false)
  const [substituteFilter, setSubstituteFilter] = useState(false)
  const [weaponsFilter, setWeaponsFilter] = useState([])

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
          <Checkbox
            label="Decking"
            value={deckingFilter}
            onChange={setDeckingFilter}
          />
          <Checkbox
            label="Player"
            value={playerFilter}
            onChange={setPlayerFilter}
          />
          <Checkbox
            label="Substitute"
            value={substituteFilter}
            onChange={setSubstituteFilter}
          />
          <Select
            label="Weapons"
            options={weapons}
            values={weaponsFilter}
            onChange={setWeaponsFilter}
          />
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
              .filter(
                player =>
                  weaponsFilter.length === 0 ||
                  player.weapons.some(weapon =>
                    weaponsFilter.map(weapon => weapon.id).includes(weapon.id)
                  )
              )
              .sort((a, b) => a.fields.name.localeCompare(b.fields.name))
              .map(player => (
                <li key={player.id}>
                  <LargePlayer player={player} />
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
            width: 20rem;
          }

          input {
            width: 100%;
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
      })),
      weapons: weapons
    }
  }
}

export default Players
