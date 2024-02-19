import privateHttp from './http/privateHttp.config'
import publicHttp from './http/publicHttp.config'

const GARDEN_SERVICE_TEMPLATE = {
  getServiceTemplate: async (farmId) => {
    return await publicHttp({
      method: 'GET',
      url: `/gardenServiceTemplate/farm/${farmId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },
  addServiceTemplate: async (data) => {
    return await privateHttp({
      method: 'POST',
      url: `gardenServiceTemplate`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateServiceTemplate: async (data, serviceTemplateId) => {
    return await privateHttp({
      method: 'PATCH',
      url: `gardenServiceTemplate/${serviceTemplateId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deleteServiceTemplate: async (serviceTemplateId) => {
    return await privateHttp({
      method: 'DELETE',
      url: `gardenServiceTemplate/${serviceTemplateId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default GARDEN_SERVICE_TEMPLATE
