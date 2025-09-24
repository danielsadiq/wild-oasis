import type { CabinType } from "../types/cabinType";
import type { FormInputType } from "../types/formInputType";
import { supabase, supabaseUrl } from "./supabase";

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
  console.log(newCabin.image[0].name)
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create cabins
  const { data, error } = await supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]).select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image[0]);
  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    console.log(storageError)
    await supabase.from("cabins").delete().eq("id", data.id);
  }
}
