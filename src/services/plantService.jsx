import privateHttp from './http/privateHttp.config'
import publicHttp from './http/publicHttp.config'

const PLANT = {
  getAllPlant: async () => {
    return await publicHttp({
      method: 'GET',
      url: `/plant/recommend`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getPlantByPlantId: async (plantId) => {
    return await publicHttp({
      method: 'GET',
      url: `/plant/${plantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getPlantFromFarm: async (farmId) => {
    return await publicHttp({
      method: 'GET',
      url: `/plant/farm/${farmId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getDefautlPlant: async (plantId) => {
    return await publicHttp({
      method: 'GET',
      url: `/plant/default/${plantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deletePlant: async (plantId) => {
    return await privateHttp({
      method: 'DELETE',
      url: `/plant/${plantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addPlant: async (data) => {
    return await privateHttp({
      method: 'POST',
      url: `/plant`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addPlantByRecommendPlantId: async (recommentPlantId) => {
    return await privateHttp({
      method: 'POST',
      url: `/plant/add/${recommentPlantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getPlantWithSeed: async () => {
    return await publicHttp({
      method: 'GET',
      url: `/plants-and-seeds`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updatePlant: async ({ plantId, data }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `/plant/${plantId}`,
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

export default PLANT
