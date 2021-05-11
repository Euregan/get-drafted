import { Card, Flexbox } from 'dystopia'
import SmallPlayer from '../components/SmallPlayer'

const SmallTeam = ({ team }) => (
  <Card title={team.name} color={team.color}>
    <Flexbox direction="column" gap="small">
      {team.players.length === 0 && 'Team composition to be decided'}
      {team.players.map((player) => (
        <div key={player.id}>
          <SmallPlayer player={player} />
        </div>
      ))}
    </Flexbox>
  </Card>
)

export default SmallTeam
