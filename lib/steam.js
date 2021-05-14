import passport from 'passport'
import SteamStrategy from 'passport-steam'

passport.use(
  new SteamStrategy(
    {
      returnURL: 'https://get-drafted.vercel.app/api/auth',
      realm: 'https://get-drafted.vercel.app/',
      apiKey: process.env.STEAM_API_KEY,
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
