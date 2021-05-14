import { useState, useEffect } from 'react'
import { Flexbox, Loading } from 'dystopia'
import LargeTeam from '../components/LargeTeam'
import Layout from '../components/Layout'

const Teams = ({ teams }) => {
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
      <Flexbox direction="column" gap="large">
        {competitionLoading && <Loading label="Loading teams" />}
        {!competitionLoading &&
          !competitionError &&
          competition.teams
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(team => <LargeTeam key={team.id} team={team} />)}
      </Flexbox>
    </Layout>
  )
}

export default Teams
