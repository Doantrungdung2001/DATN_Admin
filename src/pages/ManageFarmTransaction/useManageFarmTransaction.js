import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import EVENT from '../../services/eventService'

export default function useManageEvents() {
  const parseDataEvent = useCallback((data) => {
    const allEvent = data.map((item) => ({
      _id: item?._id,
      walletAddress: item?.walletAddress,
      fee: item?.fee,
      timestamp: item?.timestamp,
      event: item?.event,
      farm: item?.farm?.name
    }))
    return { allEvent }
  }, [])

  const {
    data: dataEvent,
    isSuccess,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getAllEvent'],
    queryFn: () => EVENT.getAllEvent(),
    staleTime: 20 * 1000,
    select: (data) => parseDataEvent(data?.data?.metadata)
  })

  return {
    allEvents: dataEvent?.allEvent,
    isSuccess,
    isLoading,
    refetch
  }
}
