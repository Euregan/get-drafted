import { useEffect, useState } from 'react'
import { Card, Flexbox, Checkbox, OptionList, Loading } from 'dystopia'
import LargePlayer from '../components/LargePlayer'
import Layout from '../components/Layout'

const Players = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [deckingFilter, setDeckingFilter] = useState(false)
  const [playerFilter, setPlayerFilter] = useState(false)
  const [substituteFilter, setSubstituteFilter] = useState(false)
  const [weaponsFilter, setWeaponsFilter] = useState([])

  const [weapons, setWeapons] = useState([])
  const [weaponsLoading, setWeaponsLoading] = useState(true)
  const [weaponsError, setWeaponsError] = useState(null)

  const [players, setPlayers] = useState([])
  const [playersLoading, setPlayersLoading] = useState(true)
  const [playersError, setPlayersError] = useState(null)

  useEffect(() => {
    fetch('/api/weapons')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(weapons => {
        setWeapons(weapons)
        setWeaponsLoading(false)
      })
      .catch(error => {
        setWeaponsError(error)
        setWeaponsLoading(false)
      })

    fetch('/api/players')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(players => {
        setPlayers(players)
        setPlayersLoading(false)
      })
      .catch(error => {
        setPlayersError(error)
        setPlayersLoading(false)
      })
  }, [])

  return (
    <Layout>
      <div className="players-page">
        <aside>
          <Flexbox direction="column" gap="small">
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
            {weaponsLoading && <Loading label="Loading weapons" />}
            {!weaponsLoading && (
              <OptionList
                label="Weapons"
                options={weapons}
                values={weaponsFilter}
                onChange={setWeaponsFilter}
              />
            )}
          </Flexbox>
        </aside>
        <section>
          <Flexbox direction="column" gap="large">
            {playersLoading && <Loading label="Loading players" />}
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
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(player => (
                <div key={player.id}>
                  <LargePlayer player={player} />
                </div>
              ))}
          </Flexbox>
        </section>
        <style jsx>{`
          .players-page {
            display: flex;
            gap: var(--margin);
          }

          section {
            flex-grow: 1;
          }

          aside {
            width: 20rem;
          }

          input {
            width: 100%;
          }

          // Medium devices (tablets, 992px and down)
          @media (max-width: 992px) {
            aside {
              width: 15.5rem;
            }
          }

          // Tiny devices (phones, 575px and down)
          @media (max-width: 575px) {
            .players-page {
              flex-direction: column;
              align-items: stretch;
            }

            aside {
              width: auto;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default Players
