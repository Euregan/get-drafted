import { Card, Button, Flexbox } from 'dystopia'
import { useState } from 'react'

const MatchEdition = ({ match, matches, maps, teams, onSave }) => {
  const [date, setDate] = useState(match ? match.date : '')
  const [dateError, setDateError] = useState(null)
  const [time, setTime] = useState(match ? match.time : '')
  const [timeError, setTimeError] = useState(null)
  const [map, setMap] = useState(match ? match.map : '')
  const [mapError, setMapError] = useState(null)
  const [teamA, setTeamA] = useState(match ? match.teamA : '')
  const [teamB, setTeamB] = useState(match ? match.teamB : '')
  const [winnerMatch, setWinnerMatch] = useState(match ? match.winnerMatch : '')
  const [looserMatch, setLooserMatch] = useState(match ? match.looserMatch : '')

  const save = () => {
    setDateError(null)
    setTimeError(null)
    setMapError(null)

    let failed = false

    if (!date) {
      setDateError('The date should be set')
      failed = true
    }
    if (!time) {
      setTimeError('The time should be set')
      failed = true
    }
    if (!map) {
      setMapError('The map should be selected')
      failed = true
    }

    if (failed) {
      return
    }

    onSave({
      date: `${date} ${time}`,
      map: map === '' ? null : map,
      teamA: teamA === '' ? null : teamA,
      teamB: teamB === '' ? null : teamB,
      winnerMatch: winnerMatch === '' ? null : winnerMatch,
      looserMatch: looserMatch === '' ? null : looserMatch
    })
  }

  const availableForTeamA = teams.filter(team => !teamB || team.id !== teamB)
  const availableForTeamB = teams.filter(team => !teamA || team.id !== teamA)

  const availableMatches = matches.filter(
    match => new Date(match.date) > new Date(`${date} ${time}`)
  )

  return (
    <Card title={match ? `Edit ${match.date}` : 'Add a match'}>
      <Flexbox direction="column" gap="small">
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={event => setTime(event.target.value)}
          />
        </label>
        {dateError && <div className="error">{dateError}</div>}
        {timeError && <div className="error">{timeError}</div>}
        <label>
          Map
          <select value={map} onChange={event => setMap(event.target.value)}>
            <option value={null}>Select a map</option>
            {maps.map(map => (
              <option value={map.id} key={map.id}>
                {map.name}
              </option>
            ))}
          </select>
        </label>
        {mapError && <div className="error">{mapError}</div>}
        <label>
          Teams
          <select
            value={teamA}
            onChange={event => setTeamA(event.target.value)}
          >
            <option value={null}>Select a team</option>
            {availableForTeamA.map(team => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <select
            value={teamB}
            onChange={event => setTeamB(event.target.value)}
          >
            <option value={null}>Select a team</option>
            {availableForTeamB.map(team => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Looser match
          <select
            value={looserMatch}
            onChange={event => setLooserMatch(event.target.value)}
          >
            <option value={null}>Select a match</option>
            {availableMatches.map(match => (
              <option value={match.id} key={match.id}>
                {match.date} - {match.map.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Winner match
          <select
            value={winnerMatch}
            onChange={event => setWinnerMatch(event.target.value)}
          >
            <option value={null}>Select a match</option>
            {availableMatches.map(match => (
              <option value={match.id} key={match.id}>
                {match.date} - {match.map.name}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={() => save}>Add the match</Button>
      </Flexbox>
      <style jsx>{`
        .error {
          color: var(--red);
        }
      `}</style>
    </Card>
  )
}

export default MatchEdition
