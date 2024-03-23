import publicHttp from './http/publicHttp.config'
import privateHttp from './http/privateHttp.config'

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
    return await privateHttp({
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
    return await privateHttp({
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
  },

  deleteDistributer: async ({ distributerId }) => {
    return await privateHttp({
      method: 'DELETE',
      url: `/distributer/${distributerId}`
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
