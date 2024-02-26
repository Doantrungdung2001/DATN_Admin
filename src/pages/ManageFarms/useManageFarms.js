import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import FARM from '../../services/farmService'
import { titleCase } from '../../utils/helpers'

export default function useManageFarms() {
  const parseData = useCallback((data) => {
    console.log('Data:', data)
    const allFarms = data.map((farm) => ({
      _id: farm._id,
      name: farm.name,
      description: farm.description,
      status: farm.status,
      district: farm.district,
      address: farm.address,
      createdAt: farm.createdAt,
      email: farm.email
    }))

    // get all districts unique in allFarms, and return an array of all districts that has value = farm.district and text = tittle case of farm.district
    const allDistricts = allFarms.reduce((acc, farm) => {
      if (!acc.find((district) => district.value === farm.district)) {
        if (farm.district !== null && farm.district !== undefined && farm.district !== '') {
          acc.push({
            value: farm.district,
            text: titleCase(farm.district)
          })
        }
      }
      return acc
    }, [])

    return { allFarms, allDistricts }
  }, [])

  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ['getAllFarms'],
    queryFn: () => FARM.getAllFarms(),
    staleTime: 20 * 1000,
    select: (data) => parseData(data.data.metadata)
  })

  return {
    allFarms: data?.allFarms,
    allDistricts: data?.allDistricts,
    isSuccess,
    isLoading,
    refetch
  }
}
