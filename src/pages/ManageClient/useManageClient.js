import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import CLIENT from '../../services/clientService'

export default function useManageClient() {
  const parseDataClient = useCallback((data) => {
    const allClient = data.map((item) => ({
      _id: item?._id,
      name: item?.name,
      phone: item?.phone,
      address: item?.address,
      map: item?.map,
      status: item?.status,
      district: item?.district,
      history: item?.history,
      createdAt: item?.createdAt
    }))
    return { allClient }
  }, [])

  const {
    data: dataClient,
    isSuccess,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getAllClient'],
    queryFn: () => CLIENT.getAllClient(),
    staleTime: 20 * 1000,
    select: (data) => parseDataClient(data?.data?.metadata)
  })

  return {
    allClient: dataClient?.allClient,
    isSuccess,
    isLoading,
    refetch
  }
}
