import { getSession } from '../../lib/session'
import fauna from '../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'GET') {
    const steamUser = getSession(request)

    if (steamUser) {
      return fauna
        .query(
          `query {
                findUserBySteamId(steamId: "${steamUser.steamid}") {
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
        .then(user => response.status(200).json(user.data.findUserBySteamId))
        .catch(error => {
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
