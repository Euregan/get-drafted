import Card from '../components/Card'

const Team = ({ team }) => (
  <Card title={team.name} color={team.color}>
    <ul className="team">
      {team.players.length === 0 && 'Team composition to be decided'}
      {team.players.map(player => (
        <li key={player.id} className="player">
          <img
            src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.avatar}.jpg`}
          />
          <span>{player.name}</span>
        </li>
      ))}
    </ul>
    <style jsx>{`
      .team {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }

      .player {
        display: flex;
        align-items: center;
        gap: var(--padding);
      }

      img {
        height: 1rem;
      }
    `}</style>
  </Card>
)

export default Team
