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
  }
}

export default DISTRIBUTER
