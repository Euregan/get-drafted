import fauna from '../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'GET') {
    return fauna
      .query(
        `query {
            maps {
                data {
                    _id
                    name
                }
            }
        }`
      )
      .then(maps =>
        response.status(200).json(
          maps.data.maps.data.map(map => ({
            ...map,
            id: map._id
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
