const backgroundToTextColor = color => {
  const [r, g, b] = color
    .slice(1)
    .match(/.{1,2}/g)
    .map(color => parseInt(color, 16))

  return r + g + b > 300 ? 'black' : 'white'
}

const Card = ({ title, color, children }) => (
  <div className="card" style={{ borderColor: color }}>
    {title && (
      <div
        className="title"
        style={{
          borderColor: color,
          backgroundColor: color,
          color: color && backgroundToTextColor(color)
        }}
      >
        {title}
      </div>
    )}
    <div className="body">{children}</div>
    <style jsx>{`
      .card {
        border: var(--border);
      }

      .title {
        border-bottom: var(--border);
        font-weight: 500;
      }

      .title,
      .body {
        padding: var(--padding);
      }
    `}</style>
  </div>
)

export default Card
