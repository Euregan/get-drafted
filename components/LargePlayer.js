import Link from 'next/link'
import { Card, Flexbox } from 'dystopia'
import SmallWeapon from '../components/SmallWeapon'
import Avatar from '../components/Avatar'

const LargePlayer = ({ player }) => (
  <Link href={`/profile/${player.id}`}>
    <a>
      <Card
        title={player.name + (player.team ? ' - ' + player.team.name : '')}
        color={player.team ? player.team.color : null}
      >
        <Flexbox direction="column" gap="small">
          <Flexbox direction="row" gap="small">
            <Avatar user={player} size="large" />
            <ul className="details">
              <li className={'detail ' + (player.decking ? 'true' : 'false')}>
                <span className="label">Decking</span>
                <span className="data">
                  {player.decking ? 'true' : 'false'}
                </span>
              </li>
              <li className={'detail ' + (player.main ? 'true' : 'false')}>
                <span className="label">Player</span>
                <span className="data">{player.main ? 'true' : 'false'}</span>
              </li>
              <li
                className={'detail ' + (player.substitute ? 'true' : 'false')}
              >
                <span className="label">Substitute</span>
                <span className="data">
                  {player.substitute ? 'true' : 'false'}
                </span>
              </li>
            </ul>
          </Flexbox>
          <Flexbox direction="column" gap="small">
            {player.weapons.map(weapon => (
              <SmallWeapon key={weapon.id} weapon={weapon} />
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
    </a>
  </Link>
)

export default LargePlayer
