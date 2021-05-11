import { Picture, Flexbox } from 'dystopia'

const SmallPlayer = ({ player }) => (
  <Flexbox direction="row" gap="small">
    <Picture
      source={
        player.avatar
          ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.avatar}_full.jpg`
          : null
      }
      size="small"
    />
    <span>{player.name}</span>
  </Flexbox>
)

export default SmallPlayer
