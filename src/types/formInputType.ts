/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormInputType {
  name: string,
  maxCapacity: number,
  regularPrice: number,
  discount?: number,
  description: string,
  image?: FileList | any,
}