import { getSession } from '../../../lib/session'
import fauna from '../../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { userId, weaponsToAdd, weaponsToRemove } = JSON.parse(request.body)

    const steamUser = getSession(request)

    if (steamUser) {
      return fauna
        .query(
          `query {
              findUserBySteamId(steamId: "${steamUser.steamid}") {
                  _id
                  steamId
                  name
                  avatar
                  admin
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
          }`
        )
        .then((user) =>
          fauna
            .query(
              `mutation {
                  updateUser(
                      id: "${user.data.findUserBySteamId._id}"
                      data: {
                          name: "${user.data.findUserBySteamId.name}"
                          avatar: "${user.data.findUserBySteamId.avatar}"
                          steamId: "${user.data.findUserBySteamId.steamId}"
                          admin: "${user.data.findUserBySteamId.admin}"
                          weapons: {
                              connect: [${weaponsToAdd.join(',')}]
                              disconnect: [${weaponsToRemove.join(',')}]
                          }
                      }
                  ) {
                      name
                      weapons {
                          data {
                              _id
                              name
                          }
                      }
                  }
              }`
            )
            .then((user) =>
              response.status(200).json(user.data.updateUser.weapons)
            )
        )
        .catch((error) => {
          console.error(error)
          response.status(500).end()
        })
    } else {
      response.status(403).end()
    }
  } else {
    response.status(405).end()
  }
}
