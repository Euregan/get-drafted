import passport from 'passport'
import nextConnect from 'next-connect'
import steam from '../../lib/steam'
import fauna from '../../lib/fauna'
import { setLoginSession } from '../../lib/session'

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const steamUser = await steam(req, res)

      setLoginSession(res, steamUser)

      fauna
        .query(
          `query {
            findUserBySteamId(steamId: "${steamUser._json.steamid}") {
                name
                weapons {data{name}}
                teams {data{name}}
            }
        }`
        )
        .then(databaseUser =>
          // if the user doesn't exist yet, we create it
          !databaseUser.data.findUserBySteamId
            ? fauna.query(
                `mutation CreateUser {
                    createUser(data: {
                        name: "${steamUser._json.personaname}"
                        steamId: "${steamUser._json.steamid}"
                        avatar: "${steamUser._json.avatarhash}"
                        admin: false
                        decking: false
                    }) {name}
                }`
              )
            : databaseUser
        )
        .then(() => res.redirect('/profile'))
        .catch(error => {
          console.error(error)
          res.status(401).send(error.message)
        })
    } catch (error) {
      console.error(error)
      res.status(401).send(error.message)
    }
  })
