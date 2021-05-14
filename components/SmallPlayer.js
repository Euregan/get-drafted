import { Picture, Flexbox } from 'dystopia'
import Avatar from './Avatar'

const SmallPlayer = ({ player }) => (
  <Flexbox direction="row" gap="small">
    <Avatar user={player} size="small" />
    <span>{player.name}</span>
  </Flexbox>
)

export default SmallPlayer
