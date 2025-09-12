import { inject, injectable } from "tsyringe";
import { IAddressInterface } from "../interfaces/address.Interface";
import { CreateAddressType, UpdateAddressType } from "../dto/addressDto";
import { BadRequestException, NotFoundException } from "@/globalError/ErrorHandler";
import { TOKENS } from "@/core/utils/tokens";




@injectable()
export class AddressServiceImpl {

    constructor(@inject(TOKENS.AddressRepository) private repo:IAddressInterface){}


    async OnCreateAddress(data:CreateAddressType){
             const address = await this.repo.createAddress(data);
             if(!address?.addressId){
                   throw new BadRequestException(`Failed to Create Address`)
             }
             return address;
    }


    async OnUpdateAddress(address_id:string, data:UpdateAddressType){
                  if(!address_id){
                      throw new BadRequestException(`Address_id should not be null`)
                  }
                  const update = await this.repo.updateAddress(address_id,data);
                  if(!update?.addressId){
                       throw new BadRequestException(`Failed to Update Address`)
                  }
                  return update;
    }


    async OnFetchAddress(addressId:string){
              if(!addressId){
                    throw new BadRequestException(`Address_id should not be null`)
              }
              const address = await this.repo.fetchAddressOnly(addressId);
              if(!address?.addressId){
                   throw new NotFoundException(`Address not found with Id: ${addressId} `)
              }
              return address;
    }

    async OnFetchAllAddress(limit:number,offset:number, page:number){
              const address = await this.repo.fetchAllAddresses(limit,offset,page);
              if(!address.data || address.data.length==0){
                  throw new NotFoundException(`No Address found`);
              }
              return address;
    }

    async OnDeleteAddress(addressId:string){
               if(!addressId){
                    throw new BadRequestException(`Address_id should not be null`)
              }
              const  address = await this.repo.fetchAddressOnly(addressId);
              if(!address?.addressId){
                  throw new NotFoundException(`Address not found with Id: ${addressId} `)
              }

              return await this.repo.deleteAddress(addressId);


    }
}