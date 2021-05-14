const backgroundToTextColor = color => {
  const [r, g, b] = color
    .slice(1)
    .match(/.{1,2}/g)
    .map(color => parseInt(color, 16))

  return r + g + b > 300 ? 'black' : 'white'
}

const Label = ({ label, color }) => (
  <div
    style={{
      borderColor: color,
      backgroundColor: color,
      color: backgroundToTextColor(color)
    }}
  >
    {label}
    <style jsx>{`
      div {
        padding: var(--padding);
      }
    `}</style>
  </div>
)

export default Label
