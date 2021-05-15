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
            <Flexbox direction="column" gap="small">
              <div>
                <span>Decking</span>
                <span className={player.decking ? 'true' : 'false'}>
                  {player.decking ? 'true' : 'false'}
                </span>
              </div>
              {player.weapons.map(weapon => (
                <SmallWeapon key={weapon.id} weapon={weapon} />
              ))}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Card>
      <style jsx>{`
        .true,
        .false {
          margin-left: var(--padding);
        }

        .true {
          color: var(--green);
        }

        .false {
          color: var(--red);
        }
      `}</style>
    </a>
  </Link>
)

export default LargePlayer
