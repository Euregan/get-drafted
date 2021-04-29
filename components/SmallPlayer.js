const SmallPlayer = ({ player }) => (
  <div className="player">
    <img
      src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${player.avatar}.jpg`}
    />
    <span>{player.name}</span>
    <style jsx>{`
      .player {
        display: flex;
        align-items: center;
        gap: var(--padding);
      }

      img {
        height: 1rem;
      }
    `}</style>
  </div>
)

export default SmallPlayer
