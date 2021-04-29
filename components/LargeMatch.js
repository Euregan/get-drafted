import Card from '../components/Card'
import SmallTeam from '../components/SmallTeam'

const LargeMatch = ({ match }) => (
  <Card title={`${new Date(match.date)} - ${match.maps[0].name}`}>
    <div className="match">
      {match.teams.length <= 1 && 'Previous matches not decided yet'}
      {match.teams.length === 2 && <SmallTeam team={match.teams[0]} />}
      {match.teams.length === 2 && <SmallTeam team={match.teams[1]} />}
    </div>
    <style jsx>{`
      .match {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }
    `}</style>
  </Card>
)

export default LargeMatch
