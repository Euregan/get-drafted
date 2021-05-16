import Link from 'next/link'
import { Card, Flexbox } from 'dystopia'
import SmallWeapon from '../components/SmallWeapon'
import Cyberdeck from '../components/icon/Cyberdeck'
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
              {player.decking && (
                <Flexbox direction="row" gap="small">
                  <Cyberdeck color="white" size="small" />
                  <span>Decker</span>
                </Flexbox>
              )}
              {player.weapons.map((weapon) => (
                <SmallWeapon key={weapon.id} weapon={weapon} />
              ))}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Card>
      <style jsx>{`
        .decking {
        }
      `}</style>
    </a>
  </Link>
)

export default LargePlayer
