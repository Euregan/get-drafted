import fauna from '../../../lib/fauna'

export default function handler(request, response) {
  if (request.method === 'GET') {
    const { id } = request.query

    return fauna
      .query(
        `query {
              findUserByID(id: "${id}") {
                  name
                  avatar
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
      .then(user => response.status(200).json(user.data.findUserByID))
      .catch(error => {
        console.error(error)
        response.status(404).end()
      })
  } else {
    response.status(405).end()
  }
}
