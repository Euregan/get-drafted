import fauna from '../../../lib/fauna'

export default function handler(request, response) {
  if (request.method === 'GET') {
    const { id } = request.query

    return fauna
      .query(
        `query {
            findCompetitionByID(id: "${id}") {
                _id
                name
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
                                decking
                                weapons {
                                    data {
                                        _id
                                        name
                                    }
                                }
                            }
                        }
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
                                        decking
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`
      )
      .then(result =>
        response.status(200).json({
          ...result.data.findCompetitionByID,
          id: result.data.findCompetitionByID._id,
          teams: result.data.findCompetitionByID.teams.data.map(team => ({
            ...team,
            id: team._id,
            players: team.members.data.map(player => ({
              ...player,
              id: player._id,
              weapons: player.weapons.data.map(weapon => ({
                ...weapon,
                id: weapon._id
              }))
            }))
          })),
          matches: result.data.findCompetitionByID.matches.data.map(match => ({
            ...match,
            id: match._id,
            map: { ...match.map, id: match.map._id },
            teams: match.teams.data.map(team => ({
              ...team,
              id: team._id,
              players: team.members.data.map(player => ({
                ...player,
                id: player._id
              }))
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
