import fauna from '../../../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'POST') {
    if (process.env.NODE_ENV !== 'development') {
      return response.status(405).end()
    }

    const match = JSON.parse(request.body)

    return fauna
      .query(
        `mutation CreateMatch {
            createMatch(data: {
                date: "${match.date}"
                competition: {
                    connect: "${match.competition}"
                }
                map: {
                    connect: "${match.map}"
                }
                ${
                  match.teamA && match.teamB
                    ? `teams: {
                    connect: [${match.teamA}, ${match.teamB}]
                }`
                    : ''
                }
                ${
                  match.winnerMatch
                    ? `winnerMatch: {
                    connect: "${match.winnerMatch}"
                }`
                    : ''
                }
                ${
                  match.looserMatch
                    ? `looserMatch: {
                    connect: "${match.looserMatch}"
                }`
                    : ''
                }
            }) {
                _id
                date
                map {
                    _id
                    name
                }
                winnerMatch {
                    _id
                }
                looserMatch {
                    _id
                }
                teams {
                    data {
                        _id
                        name
                        color
                        members {
                            data {
                                _id
                                name
                                avatar
                            }
                        }
                    }
                }
            }
        }`
      )
      .then(result =>
        response.status(200).json({
          ...result.data.createMatch,
          map: {
            ...result.data.createMatch.map,
            id: result.data.createMatch._id
          },
          teams: result.data.createMatch.teams.data.map(team => ({
            ...team,
            id: team._id,
            players: team.members.data.map(player => ({
              ...player,
              id: player._id
            }))
          }))
        })
      )
      .catch(error => {
        console.error(error)
        response.status(500).end()
      })
  } else {
    response.status(405).end()
  }
}
