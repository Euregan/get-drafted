export default {
  query: query =>
    fetch('https://graphql.fauna.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.FAUNA_SECRET}`
      },
      body: JSON.stringify({ query })
    })
      .then(response =>
        response.ok ? response.json() : response.json().then(Promise.reject)
      )
      .then(response =>
        response.errors ? Promise.reject(response.errors) : response
      )
}
