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

    return result
  },

  logout: async () => {
    let result = await privateHttp({
      method: 'POST',
      url: 'logout'
    })

    return result
  },

  register: async ({ data }) => {
    let result = await publicHttp({
      method: 'POST',
      url: 'signup',
      data
    })

    return result
  },

  updateStatusFarm: async ({ farmId, data }) => {
    let result = await privateHttp({
      method: 'PATCH',
      url: `/farm/${farmId}/status`,
      data
    })

    return result
  },

  updateWalletAddress: async ({ farmId, data }) => {
    let result = await privateHttp({
      method: 'PATCH',
      url: `/farm/${farmId}/walletAddress`,
      data
    })

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
  },

  getAllFarms: async () => {
    let result = await privateHttp({
      method: 'GET',
      url: '/farm'
    })

    return result
  }
}

export default FARM
