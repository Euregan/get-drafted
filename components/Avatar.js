import { Picture } from 'dystopia'

const Avatar = ({ size, user }) => (
  <Picture
    source={
      user.avatar
        ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${user.avatar}_full.jpg`
        : null
    }
    size={size}
  />
)

export default Avatar
