import { Card, Picture, Flexbox } from 'dystopia'

const LargePlayer = ({ player }) => (
  <Card
    title={player.name + (player.team ? ' - ' + player.team.name : '')}
    color={player.team ? player.team.color : null}
  >
    <Flexbox direction="column" gap="small">
      <Flexbox direction="row" gap="small">
        <Picture
          source={
            player.avatar
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.avatar}_full.jpg`
              : null
          }
          size="large"
        />
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
      </Flexbox>
      <Flexbox direction="column" gap="small">
        {player.weapons.map((weapon) => (
          <div key={weapon.id}>{weapon.name}</div>
        ))}
      </Flexbox>
    </Flexbox>
    <style jsx>{`
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
    `}</style>
  </Card>
)

export default LargePlayer
