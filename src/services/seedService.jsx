import publicHttp from './http/publicHttp.config'
import privateHttp from './http/privateHttp.config'

const SEED = {
  getAllSeedByPlantId: async (plantId) => {
    return await publicHttp({
      method: 'GET',
      url: `/seed/plant?plantId=${plantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getAllSeedByPlantName: async (plantName) => {
    return await publicHttp({
      method: 'GET',
      url: `/seedsByPlantName/${plantName}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addSeedByRecommendSeedId: async ({ recommendSeedId }) => {
    return await privateHttp({
      method: 'POST',
      url: `/seed/add/${recommendSeedId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deleteSeed: async (seedId) => {
    return await privateHttp({
      method: 'DELETE',
      url: `/seed/${seedId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateSeedDefault: async (seedId) => {
    return await privateHttp({
      method: 'PATCH',
      url: `/seed/default/${seedId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateSeed: async ({ seedId, data }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `/seed/${seedId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addSeed: async (data) => {
    return await privateHttp({
      method: 'POST',
      url: '/seed',
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

export default SEED
