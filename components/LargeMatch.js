import { Card, Flexbox } from 'dystopia'
import SmallTeam from '../components/SmallTeam'

const LargeMatch = ({ match }) => (
  <Card title={`${new Date(match.date)} - ${match.maps[0].name}`}>
    <Flexbox direction="column" gap="small">
      {match.teams.length <= 1 && 'Previous matches not decided yet'}
      {match.teams.length === 2 && <SmallTeam team={match.teams[0]} />}
      {match.teams.length === 2 && <SmallTeam team={match.teams[1]} />}
    </Flexbox>
  </Card>
)

export default LargeMatch
