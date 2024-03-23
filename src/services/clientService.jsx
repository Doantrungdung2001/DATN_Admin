import privateHttp from './http/privateHttp.config'

const CLIENT = {
  getAllClient: async () => {
    return await privateHttp({
      method: 'GET',
      url: `/client`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getClientByClientId: async (clientId) => {
    return await privateHttp({
      method: 'GET',
      url: `/client/${clientId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateClient: async ({ clientId, data }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `/client/admin/${clientId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deleteClient: async ({ clientId }) => {
    return await privateHttp({
      method: 'DELETE',
      url: `/client/admin/${clientId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default CLIENT
