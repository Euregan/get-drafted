const Cyberdeck = ({ color, withCircle = false, size }) => (
  <svg
    viewBox={withCircle ? '4.7 2.7 63.95 66.1' : '18 18 40 36.8'}
    style={{ height: size === 'small' ? '1rem' : '73px' }}
  >
    <g id="Layer_2">
      {withCircle && (
        <ellipse
          stroke={color}
          fill="transparent"
          strokeWidth="2"
          cx="36.7"
          cy="35.7"
          rx="30.8"
          ry="32"
        />
      )}
      <path
        className="side"
        fill={color}
        d="M18.1,23.2l15.2,6.9c0.1,0.3,0.3,24.3,0.3,24.6L18.1,45V23.2z"
      />
      <polygon
        className="top"
        fill={color}
        points="57.9,22.9 34.4,28.6 19.8,22.1 38.9,18.2"
      />
      <path
        className="face"
        fill={color}
        d="M57.9 44.7 L35 54.7 L35 30.3 L58 24.6Z
        M55.7 30.8
        L52.9 31.7
        L52.9 29.1
        L41.6 31.8
        L41.7 34.6
        L37.6 35.7
        L37.6 51.6
        L41.9 49.7
        L38.9 44.5
        L44 48.9
        L45.5 48.2
        L40.3 42
        L48.3 47
        L49.2 46.6
        L44.3 42.3
        L52.1 45.4
        L55.7 43.8Z"
      />
    </g>
  </svg>
)

export default Cyberdeck
