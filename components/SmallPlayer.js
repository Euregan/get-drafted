import Avatar from '../components/Avatar'

const SmallPlayer = ({ player }) => (
  <div className="player">
    <Avatar player={player} size="small" />
    <span>{player.name}</span>
    <style jsx>{`
      .player {
        display: flex;
        align-items: center;
        gap: var(--padding);
      }
    `}</style>
  </div>
)

export default SmallPlayer
