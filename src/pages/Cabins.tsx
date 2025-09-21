import { useQuery } from "@tanstack/react-query";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import Spinner from "../ui/Spinner";
import type { CabinType } from "../types/cabinType";

function Cabins() {
  const {isLoading, data:cabins, error} = useQuery<CabinType[]>({ queryKey: ["cabin"], queryFn: getCabins });
  if (isLoading) return <Spinner/>
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable cabins={cabins ?? []} />
      </Row>
    </>
  );
}

export default Cabins;
