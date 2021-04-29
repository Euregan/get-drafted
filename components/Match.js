import Card from '../components/Card'
import Team from '../components/Team'

const Match = ({ match }) => (
  <Card title={`${match.date} - ${match.maps[0].name}`}>
    <div className="match">
      {match.teams.length <= 1 && 'Previous matches not decided yet'}
      {match.teams.length === 2 && <Team team={match.teams[0]} />}
      {match.teams.length === 2 && <Team team={match.teams[1]} />}
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

export default Match
