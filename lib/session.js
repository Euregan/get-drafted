import jwt from 'jsonwebtoken'
import { serialize, parse } from 'cookie'

export function setLoginSession(res, user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.MAX_AGE * 1000
  })

  const cookie = serialize('jwt', token, {
    maxAge: parseInt(process.env.MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  })

  res.setHeader('Set-Cookie', cookie)
}

const parseCookies = req => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getSession(req) {
  const cookies = parseCookies(req)
  const token = cookies.jwt

  if (!token) return

  return jwt.verify(token, process.env.JWT_SECRET)._json
}
