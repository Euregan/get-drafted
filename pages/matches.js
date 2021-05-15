import { useEffect, useState } from 'react'
import ReactFlow from 'react-flow-renderer'
import { Flexbox } from 'dystopia'
import LargeMatch from '../components/LargeMatch'
import Layout from '../components/Layout'

const Matches = () => {
  const [competition, setCompetition] = useState([])
  const [competitionLoading, setCompetitionLoading] = useState(true)
  const [competitionError, setCompetitionError] = useState(null)

  useEffect(() => {
    fetch('/api/competitions/298576443412054533')
      .then(res => (res.ok ? res.json() : res.json().then(Promise.reject)))
      .then(competition => {
        setCompetition(competition)
        setCompetitionLoading(false)
      })
      .catch(error => {
        setCompetitionError(error)
        setCompetitionLoading(false)
      })
  }, [])

  return (
    <Layout>
      {!competitionLoading && !competitionError && (
        <Flexbox direction="column" gap="large">
          {competition.matches
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map(match => (
              <div key={match.id}>
                <LargeMatch match={match} />
              </div>
            ))}
        </Flexbox>
      )}
    </Layout>
  )
}

export default Matches
