import fauna from '../../lib/fauna'

export default async (request, response) => {
  if (request.method === 'GET') {
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
      .then(weapons =>
        response
          .status(200)
          .json(
            weapons.data.weapons.data.map(weapon => ({
              ...weapon,
              id: weapon._id
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
