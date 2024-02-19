import privateHttp from './http/privateHttp.config'
import publicHttp from './http/publicHttp.config'

const SERVICE = {
  initProject: async (data) => {
    return await privateHttp({
      method: 'POST',
      url: `/farm/initProject`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardens: async (farmId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${farmId}`
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
      url: `updateGardenStatus/${gardenId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getGardenByGardenId: async (farmId, gardenId) => {
    return await publicHttp({
      method: 'GET',
      url: `garden/${farmId}/${gardenId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default SERVICE
