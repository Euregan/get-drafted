import fauna from '../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'GET') {
    return fauna
      .query(
        `query {
            users(_size: 500) {
                data {
                    _id
                    name
                    avatar
                    steamId
                    weapons {
                        data {
                            _id
                            name
                        }
                    }
                    teams {
                        data {
                            _id
                            name
                        }
                    }
                }
            }
        }`
      )
      .then(users =>
        response.status(200).json(
          users.data.users.data.map(user => ({
            ...user,
            id: user._id,
            weapons: user.weapons.data.map(weapon => ({
              ...weapon,
              id: weapon._id
            })),
            teams: user.teams.data.map(team => ({
              ...team,
              id: team._id
            }))
          }))
        )
      )
      .catch(error => {
        console.error(error)
        response.status(500).end()
      })
  } else if (request.method === 'POST') {
    if (process.env.NODE_ENV !== 'development') {
      return response.status(405).end()
    }

    const players = JSON.parse(request.body)

    return fauna
      .query(
        `query {
            weapons {
                data {
                    _id
                    name
                }
            }
        }`
      )
      .then(result => {
        const faunaWeapons = result.data.weapons.data
        const airtableWeapons = players.reduce(
          (acc, player) =>
            acc.concat(
              player.weapons.map(weapon => ({
                id: weapon.id,
                name: weapon.fields.name
              }))
            ),
          []
        )

        const weapons = faunaWeapons.map(weapon => ({
          faunaName: weapon.name,
          faunaId: weapon._id,
          airtableId: airtableWeapons.find(
            airWeapon => airWeapon.name === weapon.name
          ).id
        }))

        const queries = players.map(
          player => `mutation CreateUser {
              createUser(data: {
                  name: "${player.name}"
                  avatar: "${player.avatar}"
                  steamId: "${player.steamId}"
                  admin: false
                  weapons:  {
                      connect: [${
                        player.weapons
                          ? player.weapons
                              .map(
                                weapon =>
                                  weapons.find(w => w.airtableId === weapon.id)
                                    .faunaId
                              )
                              .map(id => `"${id}"`)
                              .join(', ')
                          : ''
                      }]
                  }
              }) {
                  _id
                  name
              }
          }`
        )

        const recursiveInsert = queries =>
          fauna
            .query(queries[0])
            .then(() =>
              queries.length > 1
                ? recursiveInsert(queries.slice(1))
                : response.status(200).json({})
            )

        return recursiveInsert(queries)
      })
      .catch(error => {
        console.error(error)
        response.status(500).end()
      })
  } else {
    response.status(405).end()
  }
}
