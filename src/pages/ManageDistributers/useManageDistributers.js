import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import DISTRIBUTER from '../../services/distributerService'

export default function useManageDistributers() {
  const parseDataDistributer = useCallback((data) => {
    const allDistributer = data.map((item) => ({
      _id: item?._id,
      name: item?.name,
      email: item?.email,
      status: item?.status,
      description: item?.description,
      images: item?.images,
      address: item?.address,
      createdAt: item?.createdAt
    }))
    return { allDistributer }
  }, [])

  const {
    data: dataDistributer,
    isSuccess,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getAllDistributer'],
    queryFn: () => DISTRIBUTER.getAllDistributer(),
    staleTime: 20 * 1000,
    select: (data) => parseDataDistributer(data?.data?.metadata)
  })

  return {
    allDistributers: dataDistributer?.allDistributer,
    isSuccess,
    isLoading,
    refetch
  }
}
