import Card from '../components/Card'

const Player = ({ player }) => (
  <Card title={player.name}>
    <div className="player">
      <div className="main">
        {player.avatar ? (
          <img
            className="avatar"
            src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.avatar}_full.jpg`}
          />
        ) : (
          <svg className="avatar avatar-substitute" viewBox="0 0 70 70">
            <line x1="0" y1="0" x2="70" y2="70" />
            <line x1="0" y1="70" x2="70" y2="0" />
          </svg>
        )}
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

      .avatar {
        height: 70px;
        width: 70px;
        box-sizing: border-box;
      }

      .avatar-substitute {
        border: var(--border);
      }

      .avatar-substitute line {
        stroke-width: var(--border-width);
        stroke: var(--border-color);
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

export default Player
