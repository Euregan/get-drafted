import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, Flexbox, Loading } from 'dystopia'
import AdminLayout from '../../../components/AdminLayout'
import MatchEdition from '../../../components/admin/MatchEdition'
import LargeMatch from '../../../components/LargeMatch'
import NotFound from '../../404'

const Competition = () => {
  const router = useRouter()
  const { id } = router.query

  const [competition, setCompetition] = useState(null)
  const [competitionLoading, setCompetitionLoading] = useState(true)
  const [competitionError, setCompetitionError] = useState(null)

  const [maps, setMaps] = useState([])
  const [mapsLoading, setMapsLoading] = useState(true)
  const [mapsError, setMapsError] = useState(null)

  const [matchCreationPending, setMatchCreationPending] = useState(false)
  const [matchCreationError, setMatchCreationError] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/competitions/${id}`)
        .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
        .then(competition => {
          setCompetition(competition)
          setCompetitionLoading(false)
        })
        .catch(error => {
          setCompetitionError(error)
          setCompetitionLoading(false)
        })
    }

    fetch('/api/maps')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(maps => {
        setMaps(maps)
        setMapsLoading(false)
      })
      .catch(error => {
        setMapsError(error)
        setMapsLoading(false)
      })
  }, [id])

  if (process.env.NODE_ENV !== 'development') {
    return <NotFound />
  }

  const saveNewMatch = match => {
    setMatchCreationError(null)
    setMatchCreationPending(true)

    fetch(`/api/competitions/${competition.id}/match`, {
      method: 'POST',
      body: JSON.stringify({
        ...match,
        date: new Date(match.date).toISOString(),
        competition: competition.id
      })
    })
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(match => {
        setCompetition({
          ...competition,
          matches: competition.matches.concat(match)
        })
        setMatchCreationPending(false)
      })
      .catch(error => {
        setMatchCreationError(error)
        setMatchCreationPending(false)
      })
  }

  return (
    <AdminLayout
      title={`Competition${competition ? ` - ${competition.name}` : ''}`}
    >
      {competitionLoading && <Loading />}
      {!competitionLoading && !competitionError && (
        <Flexbox direction="column" gap="large">
          {matchCreationPending && <Loading label="Saving" />}
          {!competitionLoading &&
            !competitionError &&
            !mapsLoading &&
            !mapsError && (
              <MatchEdition
                disabled={matchCreationPending}
                teams={competition.teams}
                matches={competition.matches.sort(
                  (a, b) => new Date(a.date) > new Date(b.date)
                )}
                maps={maps}
                onSave={saveNewMatch}
              />
            )}
          {competition.matches
            .sort((a, b) => new Date(a.date) > new Date(b.date))
            .map(match => (
              <div key={match.id}>
                <LargeMatch match={match} />
              </div>
            ))}
        </Flexbox>
      )}

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

        .rows {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--margin);
        }

        button {
          margin-left: var(--padding);
        }
      `}</style>
    </AdminLayout>
  )
}

export default Competition
