import type { CabinType } from "../types/cabinType";
import type { FormInputType } from "../types/formInputType";
import { supabase } from "./supabase";

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deletCabins(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }
}

export async function createCabin(newCabin: FormInputType) {
  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ some_column: "someValue", other_column: "otherValue" }])
  //   .select();
  const { error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  if (error){
    console.error(error);
    throw new Error("Cabin could not be created");
  }
}
