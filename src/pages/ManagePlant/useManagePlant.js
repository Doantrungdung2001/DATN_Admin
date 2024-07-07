import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import PLANT from '../../services/plantService'

export default function useManagePlant() {
  const farmId = localStorage.getItem('id')

  console.log("Du lieu farm ID",farmId)
  const parseData = useCallback((data) => {
    const plant = data.map((plant) => ({
      _id: plant._id,
      name: plant.plant_name,
      image: plant.plant_thumb,
      description: plant.plant_description,
      type: plant.plant_type,
      isActive: plant.isActive
    }))
    return { plant }
  }, [])

  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ['getPlant', farmId],
    queryFn: () => PLANT.getPlantFromFarm(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data.metadata),
    enabled: !!farmId
  })

  return {
    plantData: data?.plant,
    isSuccess,
    isLoading,
    refetch
  }
}
