import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminLayout from '../../components/AdminLayout'
import LargeCompetition from '../../components/LargeCompetition'
import NotFound from '../404'

const Competitions = () => {
  const [competitions, setCompetitions] = useState([])
  const [competitionsLoading, setCompetitionsLoading] = useState(true)
  const [competitionsError, setCompetitionsError] = useState(null)

  useEffect(() => {
    fetch('/api/competitions')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(competitions => {
        setCompetitions(competitions)
        setCompetitionsLoading(false)
      })
      .catch(error => {
        setCompetitionsError(error)
        setCompetitionsLoading(false)
      })
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return <NotFound />
  }

  return (
    <AdminLayout title="Competitions">
      <ul>
        {!competitionsLoading &&
          !competitionsError &&
          competitions.map(competition => (
            <li>
              <Link href={`/admin/competition/${competition.id}`}>
                <a>
                  <LargeCompetition
                    key={competition.id}
                    competition={competition}
                  />
                </a>
              </Link>
            </li>
          ))}
      </ul>

      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          gap: var(--padding);
        }

        li {
          display: flex;
          gap: var(--padding);
        }

        h3 {
          margin-bottom: var(--padding);
        }

        .rows {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--margin);
        }

        button {
          margin-left: var(--padding);
        }

        * + h2 {
          margin-top: var(--margin);
        }
      `}</style>
    </AdminLayout>
  )
}

export default Competitions
