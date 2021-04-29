import { useState, useRef } from 'react'
import Card from '../components/Card'
import Checkbox from '../components/Checkbox'

const Select = ({ label, options, values, onChange }) => {
  const ref = useRef(null)
  const [filter, setFilter] = useState('')

  return (
    <div className="select">
      <div
        className="head"
        type="text"
        tabIndex="1"
        placeholder={label}
        ref={ref}
        onClick={() => ref.current.focus()}
      >
        {values.length ? values.map(value => value.name).join(', ') : label}
      </div>
      <ul className="select">
        {options.map(option => (
          <li key={option.id}>
            <Checkbox
              label={option.name}
              onChange={checked =>
                checked
                  ? onChange([...values, option])
                  : onChange(values.filter(value => value.id !== option.id))
              }
              value={values.map(value => value.id).includes(option.id)}
            />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .head,
        li {
          cursor: pointer;
        }

        ul {
          display: none;
        }

        .head:focus + ul,
        ul:hover {
          display: block;
        }

        .head {
          box-sizing: border-box;
          padding-bottom: var(--padding);
        }

        ul {
          padding-top: var(--padding);
          border-top: var(--border);
        }
      `}</style>
    </div>
  )
}

export default Select
