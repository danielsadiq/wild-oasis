import { useQuery } from "@tanstack/react-query";
import type { CabinType } from "../../types/cabinType";
import { getCabins } from "../../services/apiCabins";

export function useCabin(){
  const {isLoading, data:cabins, error} = useQuery<CabinType[]>({ queryKey: ["cabins"], queryFn: getCabins });
  return {isLoading, cabins, error}
}