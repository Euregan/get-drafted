const sizeToPixels = size => ({ small: 16, large: 70 }[size])

const Avatar = ({ player, size }) =>
  player.avatar ? (
    <img
      style={{ height: `${sizeToPixels(size)}px` }}
      src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/${
        player.avatar
      }${size === 'large' ? '_full' : ''}.jpg`}
    />
  ) : (
    <>
      <svg
        viewBox={`0 0 ${sizeToPixels(size)} ${sizeToPixels(size)}`}
        style={{ height: `${sizeToPixels(size)}px` }}
      >
        <line x1="0" y1="0" x2={sizeToPixels(size)} y2={sizeToPixels(size)} />
        <line x1="0" y1={sizeToPixels(size)} x2={sizeToPixels(size)} y2="0" />
      </svg>
      <style jsx>{`
        svg {
          box-sizing: border-box;
          border: var(--border);
        }

        svg line {
          stroke-width: var(--border-width);
          stroke: var(--border-color);
        }
      `}</style>
    </>
  )

export default Avatar
