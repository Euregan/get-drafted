const Card = ({ title, children }) => (
  <div className="card">
    {title && <div className="title">{title}</div>}
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
