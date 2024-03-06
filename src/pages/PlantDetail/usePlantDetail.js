import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import PLANT from '../../services/plantService'
import PLANT_FARMING from '../../services/plantFarmingService'

export default function usePlantDetail({ plantId, seedId, isDefaultPlantFarming }) {
  const parseDataPlans = useCallback((data) => {
    const plans = data.map((plan) => ({
      _id: plan._id,
      name: plan.seed.seed_name,
      description: plan.seed.seed_description,
      image: plan.seed.seed_thumb,
      seedId: plan.seed._id,
      isSeedDefault: plan.seed.isSeedDefault,
      timeCultivates: plan.timeCultivates,
      cultivationActivities: plan.cultivationActivities,
      plantingActivity: plan.plantingActivity,
      fertilizationActivities: plan.fertilizationActivities,
      pestAndDiseaseControlActivities: plan.pestAndDiseaseControlActivities,
      bestTimeCultivate: plan.bestTimeCultivate,
      farmingTime: plan.farmingTime,
      harvestTime: plan.harvestTime
    }))
    return { plans }
  }, [])

  const {
    data: dataPlans,
    isSuccess: isSuccessPlans,
    isLoading: isLoadingPlans,
    refetch: refetchPlans
  } = useQuery({
    queryKey: ['getPlans', plantId],
    queryFn: () => PLANT_FARMING.getListPlantFarmingFromPlant(plantId),
    staleTime: 20 * 1000,
    select: (data) => parseDataPlans(data.data.metadata),
    enabled: !!plantId
  })

  const parseDataCurrentPlant = useCallback((data) => {
    const currentPlant = {
      name: data.plant_name
    }

    return {
      currentPlant
    }
  }, [])

  const {
    data: dataCurrentPlant,
    isSuccess: isSuccessCurrentPlant,
    isLoading: isLoadingCurrentPlant
  } = useQuery({
    queryKey: ['getPlantByPlantId', plantId],
    queryFn: () => PLANT.getPlantByPlantId(plantId),
    staleTime: 20 * 1000,
    select: (data) => parseDataCurrentPlant(data.data.metadata),
    enabled: !!plantId
  })

  return {
    plans: dataPlans?.plans,
    isSuccessPlans,
    isLoadingPlans,
    refetchPlans,
    currentPlant: dataCurrentPlant?.currentPlant,
    isSuccessCurrentPlant,
    isLoadingCurrentPlant
  }
}
