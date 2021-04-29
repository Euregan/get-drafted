import ReactFlow from 'react-flow-renderer'
import Layout from '../components/Layout'
import LargeMatch from '../components/LargeMatch'

const matches = [
  {
    id: '12/6/2021 17:30',
    type: 'input', // input node
    data: { label: '12/6/2021 17:30' },
    position: { x: 0, y: 0 }
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 }
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 }
  },
  // animated edge
  { id: 'e1-2', source: '12/6/2021 17:30', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]

const Matches = ({ matches }) => (
  <Layout>
    <ul className="match-list">
      {matches
        .sort((a, b) => new Date(a.date) > new Date(b.date))
        .map(match => (
          <li key={match.id}>
            <LargeMatch match={match} />
          </li>
        ))}
    </ul>
    <style jsx>{`
      .match-list {
        display: flex;
        flex-direction: column;
        gap: var(--margin);
      }
    `}</style>
  </Layout>
)

export async function getStaticProps() {
  const [matches, teams, players, maps] = await Promise.all([
    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/matches`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(matches =>
        matches.records.map(match => ({
          ...match,
          ...match.fields
        }))
      ),
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

    fetch(`https://api.airtable.com/v0/${process.env.DATABASE_ID}/maps`, {
      headers: {
        Authorization: `Bearer ${process.env.DATABASE_AUTH_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(maps =>
        maps.records.map(map => ({
          ...map,
          ...map.fields
        }))
      )
  ])

  return {
    props: {
      matches: matches.map(match => ({
        ...match,
        teams: (match.teams || [])
          .map(id => teams.find(team => team.id === id))
          .map(team => ({
            ...team,
            players: (team.players || []).map(id =>
              players.find(player => player.id === id)
            )
          })),
        maps: (match.maps || []).map(id => maps.find(map => map.id === id))
      }))
    }
  }
}

export default Matches
