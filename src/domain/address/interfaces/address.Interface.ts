import { AddressRow } from "@/config/schema/address.entity";
import { CreateAddressType, UpdateAddressType } from "../dto/addressDto";

export type PaginatedAddressResult = {
  data: AddressRow[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
};



export interface IAddressInterface{
        createAddress(data:CreateAddressType):Promise<AddressRow>;
        updateAddress(addressId:string, data:UpdateAddressType):Promise<AddressRow>
        fetchAddressOnly(addressId:string):Promise<AddressRow| null>
        fetchAllAddresses(limit:number, offset:number, page:number):Promise<PaginatedAddressResult>
        deleteAddress(addressId:string):Promise<number>
}