import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings"

export default function useSetting(){
  const {isLoading, data:settings, error} = useQuery({queryKey: ['settings'], queryFn: getSettings})
  return {settings, isLoading, error}
}