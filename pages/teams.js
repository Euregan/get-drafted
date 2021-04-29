import Layout from '../components/Layout'
import LargeTeam from '../components/LargeTeam'

const Teams = ({ teams }) => (
  <Layout>
    <ul className="teams">
      {teams
        .sort((a, b) => a.fields.name.localeCompare(b.fields.name))
        .map(team => (
          <li key={team.id}>
            <LargeTeam team={team} />
          </li>
        ))}
      <style jsx>{`
        .teams {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: var(--margin);
        }
      `}</style>
    </ul>
  </Layout>
)

export async function getStaticProps() {
  const [teams, players, weapons] = await Promise.all([
    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/teams`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(teams =>
        teams.records.map(team => ({
          ...team,
          ...team.fields
        }))
      ),
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
      )
  ])

  return {
    props: {
      teams: teams.map(team => ({
        ...team,
        players: (team.players || [])
          .map(id => players.find(player => player.id === id))
          .map(player => ({
            ...player,
            weapons: (player.fields.weapons || []).map(id =>
              weapons.find(weapon => weapon.id === id)
            )
          }))
      }))
    }
  }
}

export default Teams
