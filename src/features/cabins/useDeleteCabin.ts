import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletCabin as deletCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(){
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate:deleteCabin } = useMutation<void, Error, number>({
    mutationFn: deletCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfuly deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return {isDeleting, deleteCabin}
}