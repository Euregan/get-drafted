import Card from '../components/Card'
import LargePlayer from '../components/LargePlayer'

const LargeTeam = ({ team }) => (
  <Card title={team.name} color={team.color}>
    <ul className="team">
      {team.players.length === 0 && 'Team composition to be decided'}
      {team.players.map(player => (
        <li key={player.id}>
          <LargePlayer player={player} />
        </li>
      ))}
    </ul>
    <style jsx>{`
      .team {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }
    `}</style>
  </Card>
)

export default LargeTeam
