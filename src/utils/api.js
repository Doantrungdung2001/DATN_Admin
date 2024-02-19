let LINK = process.env.LINK || '35.247.150.142:8080'
const api = async (url, method, body) => {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let token = localStorage.getItem('token')
  if (token) myHeaders.append('x-access-token', token)
  let requestOptions =
    body === null
      ? {
          method: method,
          headers: myHeaders
        }
      : {
          method: method,
          headers: myHeaders,
          body: JSON.stringify(body)
        }

  console.log('request: ', LINK + url)
  let response = await fetch(LINK + url, requestOptions)
  let result = await response.json()
  result.status = response.status
  return result
}

export default api
