import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import TRANSFER from '../../services/transferService'
import FARM from '../../services/farmService'

export default function useManageTransfers() {
  const parseDataTransfer = useCallback((data) => {
    const allTransfer = data.map((item) => ({
      _id: item?._id,
      farm: item?.farm,
      tx: item?.tx,
      amount: item?.amount,
      createdAt: item?.createdAt
    }))
    return { allTransfer }
  }, [])

  const {
    data: dataTransfer,
    isSuccess,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getAllTransfer'],
    queryFn: () => TRANSFER.getAllTransfer(),
    staleTime: 20 * 1000,
    select: (data) => parseDataTransfer(data?.data?.metadata)
  })

  const parseData = useCallback((data) => {
    const allFarms = data.map((farm) => ({
      _id: farm._id,
      name: farm.name,
      description: farm.description,
      status: farm.status,
      district: farm.district,
      address: farm.address,
      createdAt: farm.createdAt,
      email: farm.email,
      walletAddress: farm?.walletAddress
    }))

    return { allFarms }
  }, [])

  const {
    data,
    isSuccess: isSuccessFarm,
    isLoading: isLoadingFarm
  } = useQuery({
    queryKey: ['getAllFarms'],
    queryFn: () => FARM.getAllFarms(),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data.metadata)
  })

  return {
    allTransfers: dataTransfer?.allTransfer,
    isSuccess,
    isLoading,
    refetch,
    allFarms: data?.allFarms,
    isSuccessFarm,
    isLoadingFarm
  }
}
