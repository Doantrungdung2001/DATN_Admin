import privateHttp from './http/privateHttp.config'
import publicHttp from './http/publicHttp.config'

const FARM = {
  me: () =>
    privateHttp({
      method: 'GET',
      url: '/access/me'
    }),
  login: async ({ email, password }) => {
    let result = await publicHttp({
      method: 'POST',
      url: 'login',
      data: {
        email,
        password
      }
    })

    console.log('result: ', result)
    return result
  },

  getProfile: async ({ farmId }) => {
    let result = await publicHttp({
      method: 'GET',
      url: `/farm/${farmId}`
    })

    return result
  },

  updateProfile: async ({ data }) => {
    let result = await privateHttp({
      method: 'PATCH',
      url: `/farm`,
      data
    })

    return result
  }
}

export default FARM
