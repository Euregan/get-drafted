import { Card, Flexbox } from 'dystopia'
import LargePlayer from '../components/LargePlayer'

const LargeTeam = ({ team }) => (
  <Card title={team.name} color={team.color}>
    <Flexbox direction="column" gap="small">
      {team.players.length === 0 && 'Team composition to be decided'}
      {team.players.map((player) => (
        <div key={player.id}>
          <LargePlayer player={player} />
        </div>
      ))}
    </Flexbox>
  </Card>
)

export default LargeTeam
