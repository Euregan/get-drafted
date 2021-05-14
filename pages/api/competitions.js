import fauna from '../../lib/fauna'

export default function handler(request, response) {
  if (request.method === 'GET') {
    return fauna
      .query(
        `query {
            competitions {
                data {
                    _id
                    name
                    teams {
                        data {
                            _id
                            name
                            color
                        }
                    }
                    matches {
                        data {
                            _id
                            date
                            map {
                                _id
                                name
                            }
                        }
                    }
                }
            }
        }`
      )
      .then(result =>
        response.status(200).json(
          result.data.competitions.data.map(competition => ({
            ...competition,
            id: competition._id,
            teams: competition.teams.data.map(team => ({
              ...team,
              id: team._id
            })),
            matches: competition.matches.data.map(match => ({
              ...match,
              id: match._id
            }))
          }))
        )
      )
      .catch(error => {
        console.error(error)
        response.status(500).end()
      })
  } else {
    response.status(405).end()
  }
}
