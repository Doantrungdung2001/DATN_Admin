import publicHttp from './http/publicHttp.config'
import privateHttp from './http/privateHttp.config'

const PLANT_FARMING = {
  getListPlantFarmingFromPlant: async (plantId) => {
    return await publicHttp({
      method: 'GET',
      url: `/plantFarming/plant/${plantId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getPlantFarmingFromSeed: async (seed) => {
    return await publicHttp({
      method: 'GET',
      url: `/plantFarming/seed/${seed}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getRecommendPlantFarmingFromPlantNameAndSeedName: async ({ plantName, seedName }) => {
    return await publicHttp({
      method: 'GET',
      url: `/plantFarming/recommend/${plantName}?seedName=${seedName}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addPlantFarming: async (data) => {
    return await privateHttp({
      method: 'POST',
      url: '/plantFarming',
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addPlantFarmingWithRecommendPlantIdAndSeedId: async ({ plantId, seedId, data }) => {
    return await privateHttp({
      method: 'POST',
      url: `/plantFarming/add/${plantId}/${seedId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updatePlantFarming: async ({ plantFarmingId, data }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `/plantFarming/${plantFarmingId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deletePlantFarming: async (plantFarmingId) => {
    return await privateHttp({
      method: 'DELETE',
      url: `/plantFarming/${plantFarmingId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default PLANT_FARMING
