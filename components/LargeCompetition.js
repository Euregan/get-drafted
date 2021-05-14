import { Card, Flexbox } from 'dystopia'
import SmallMatch from '../components/SmallMatch'

const LargeCompetition = ({ competition }) => (
  <Card title={competition.name}>
    <Flexbox direction="column" gap="small">
      {competition.matches.length === 0 && 'Competition has no match'}
      {competition.matches
        .sort((a, b) => new Date(a.date) > new Date(b.date))
        .map(match => (
          <SmallMatch key={match.id} match={match} />
        ))}
    </Flexbox>
  </Card>
)

export default LargeCompetition
