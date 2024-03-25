import publicHttp from './http/publicHttp.config'
import privateHttp from './http/privateHttp.config'

const TRANSFER = {
  getAllTransfer: async () => {
    return await publicHttp({
      method: 'GET',
      url: `transfer/`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  getTransferByTransferId: async ({ transferId }) => {
    return await publicHttp({
      method: 'GET',
      url: `transfer/${transferId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  addTransfer: async ({ data }) => {
    return await privateHttp({
      method: 'POST',
      url: `transfer`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  updateTransfer: async ({ data, transferId }) => {
    return await privateHttp({
      method: 'PATCH',
      url: `transfer/${transferId}`,
      data
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  },

  deleteTransfer: async ({ transferId }) => {
    return await privateHttp({
      method: 'DELETE',
      url: `transfer/${transferId}`
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
}

export default TRANSFER
