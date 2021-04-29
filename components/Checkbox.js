const Checkbox = ({ label, value, onChange }) => (
  <label>
    {label}
    <input type="checkbox" checked={value} onChange={() => onChange(!value)} />
    <style jsx>{`
      label,
      [type='checkbox'] {
        cursor: pointer;
      }

      label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--padding);
      }
    `}</style>
  </label>
)

export default Checkbox
