import Card from '../components/Card'
import Avatar from '../components/Avatar'

const LargePlayer = ({ player }) => (
  <Card
    title={player.name + (player.team ? ' - ' + player.team.name : '')}
    color={player.team ? player.team.color : null}
  >
    <div className="player">
      <div className="main">
        <Avatar player={player} size="large" />
        <ul className="details">
          <li className={'detail ' + (player.decking ? 'true' : 'false')}>
            <span className="label">Decking</span>
            <span className="data">{player.decking ? 'true' : 'false'}</span>
          </li>
          <li className={'detail ' + (player.main ? 'true' : 'false')}>
            <span className="label">Player</span>
            <span className="data">{player.main ? 'true' : 'false'}</span>
          </li>
          <li className={'detail ' + (player.substitute ? 'true' : 'false')}>
            <span className="label">Substitute</span>
            <span className="data">{player.substitute ? 'true' : 'false'}</span>
          </li>
        </ul>
      </div>
      <ul className="weapons">
        {player.weapons.map(weapon => (
          <li key={weapon.id}>{weapon.name}</li>
        ))}
      </ul>
    </div>
    <style jsx>{`
      .player {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }

      .main {
        display: flex;
        gap: var(--padding);
        align-items: flex-start;
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
        text-transform: uppercase;
      }

      .details li {
        display: flex;
        gap: var(--padding);
      }

      .true .data {
        color: var(--green);
      }

      .false .data {
        color: var(--red);
      }

      .weapons {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
      }
    `}</style>
  </Card>
)

export default LargePlayer
