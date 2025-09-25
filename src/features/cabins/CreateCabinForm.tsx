import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import type { FormInputType } from "../../types/formInputType";
import FormRow from "../../ui/FormRow";
import SpecialFormRow from "../../ui/SpecialFormRow";
import type { CabinType } from "../../types/cabinType";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CreateCabinFormType {
  cabinToEdit?: CabinType;
  onCloseModal?: ()=>void;
}
function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormType) {
  let editId: number | undefined;
  // let editValues: Partial<CabinType> = {};

  if (cabinToEdit) {
    ({ id: editId } = cabinToEdit);
  }
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
  useForm<FormInputType>({ defaultValues: isEditSession ? cabinToEdit : {} });
  const { errors } = formState;

  const {createCabin, isCreating} = useCreateCabin();
  const {editCabin, isEditing} = useEditCabin();
  const isWorking = isCreating || isEditing

  function onSubmit(data: FormInputType) {
    if (isEditSession) editCabin({newCabin: data, id:editId}, {
      onSuccess: ()=>{
        reset();
        onCloseModal?.();
      }
    })
    else createCabin({newCabin: data}, {onSuccess: () => {
      reset();
      onCloseModal?.();
    }});
  }
  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal": "regular"}>
      <FormRow label="Create Cabin" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for Website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <SpecialFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit Cabin" : "Create cabin"}
        </Button>
      </SpecialFormRow>
    </Form>
  );
}

export default CreateCabinForm;
