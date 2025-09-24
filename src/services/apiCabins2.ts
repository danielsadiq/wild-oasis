import type { CabinType } from "../types/cabinType";
import type { FormInputType } from "../types/formInputType";
import { supabase, supabaseUrl } from "./supabase";

interface EditCabinType{
  newCabin: FormInputType,
  id?: number,
}

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

export async function createEditCabin({newCabin, id}: EditCabinType) {
  console.log(newCabin.image[0].name)
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabins
  // const { data, error } = await supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]).select().single();
  // if (error) {
  //   console.error(error);
  //   throw new Error("Cabin could not be created");
  // }

  // 1. Create cabins
  let query = supabase.from("cabins");
  // const query = supabase.from("cabins");

  // A) CREATE
  if (!id) {
    query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B) EDIT
  if (id) {
    query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data } = await query.select().single();

  // 2. Upload image
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image[0]);
  console.log(newCabin.image[0])

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    console.log(storageError);
    console.log("here")
    await supabase.from("cabins").delete().eq("id", data.id);
  }
}



  // 1. Create cabins
  // let query = supabase.from("cabins");
  // const query = supabase.from("cabins");

  // A) CREATE
  // if (!id) {
  // }
  // query.insert([{ ...newCabin, image: imagePath }]);
  // B) EDIT
  // if (id) {
  //   query
  //     .update({ ...newCabin, image: imagePath })
  //     .eq("id", id)
  //     .select();
  // }
  // const { data, error } = await query.select().single();