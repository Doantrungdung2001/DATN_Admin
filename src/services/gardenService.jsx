import privateHttp from './http/privateHttp.config'
import publicHttp from './http/publicHttp.config'

const GARDEN = {
  getGardens: async (farmId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/farm/${farmId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenByGardenId: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${gardenId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addNewProjectToGarden: async (data, gardenId) => {
    return await privateHttp({
      method: 'POST',
      url: `garden/${gardenId}/addNewProject`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenInput: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${gardenId}/projects`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getClientRequest: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${gardenId}/clientRequest`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenOutput: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${gardenId}/delivery`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addDelivery: async ({ data, gardenId }) => {
    return await privateHttp({
      method: 'POST',
      url: `garden/${gardenId}/delivery`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateDelivery: async ({ data, gardenId, deliveryId }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `garden/${gardenId}/delivery/${deliveryId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deleteDelivery: async ({ gardenId, deliveryId }) => {
    return await privateHttp({
      method: 'DELETE',
      url: `garden/${gardenId}/delivery/${deliveryId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateStatusGarden: async (data, gardenId) => {
    return await privateHttp({
      method: 'PATCH',
      url: `garden/${gardenId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  // not use
  getPlantCurrentGarden: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `plantCurrentInGarden/${gardenId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenTemplate: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `gardenPlantFarming/${gardenId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenProject: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `gardenProject/${gardenId}`
    }).catch((err) => {
      return err
    })
  },

  getRequestGarden: async (gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `clientRequests/${gardenId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default GARDEN
