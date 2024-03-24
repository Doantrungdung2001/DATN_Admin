import publicHttp from './http/publicHttp.config'

const EVENT = {
  getAllEvent: async () => {
    let result = await publicHttp({
      method: 'GET',
      url: '/event'
    })

    return result
  },

  getEvent: async ({ eventId }) => {
    let result = await publicHttp({
      method: 'GET',
      url: `/event/${eventId}`
    })

    return result
  }
}

export default EVENT
