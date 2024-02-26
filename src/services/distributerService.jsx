import publicHttp from './http/publicHttp.config'

const DISTRIBUTER = {
  getAllDistributer: async () => {
    return await publicHttp({
      method: 'GET',
      url: `/distributer`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getDistributerByDistributerId: async (distributerId) => {
    return await publicHttp({
      method: 'GET',
      url: `/distributer/${distributerId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addDistributer: async ({ data }) => {
    return await publicHttp({
      method: 'POST',
      url: `/distributer`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateDistributer: async ({ distributerId, data }) => {
    return await publicHttp({
      method: 'PATCH',
      url: `/distributer/${distributerId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default DISTRIBUTER
