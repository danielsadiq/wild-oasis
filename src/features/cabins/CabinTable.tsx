import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import type { CabinType } from "../../types/cabinType";

function CabinTable() {
  const { isLoading, cabins, error } = useCabin();
  if (error) {
    console.log(error);
  }
  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin: CabinType) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
      {/* <Table.Body data={cabins} render= {cabin => <CabinRow cabin={cabin} key={cabin.id} /> */}
    </Table>
  );
}

export default CabinTable;
