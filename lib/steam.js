import passport from 'passport'
import SteamStrategy from 'passport-steam'

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/api/auth',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY
    },
    (identifier, profile, done) => {
      done(null, profile)
    }
  )
)

const authenticate = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate('steam', { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

export default authenticate
