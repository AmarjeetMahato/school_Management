import { inject, injectable } from "tsyringe";
import { IAddressInterface, PaginatedAddressResult } from "../interfaces/address.Interface";
import { Addresses, AddressRow } from "@/config/schema/address.entity";
import { CreateAddressType, UpdateAddressType } from "../dto/addressDto";
import { DbOrTx } from "@/config/db";
import { eq, sql } from "drizzle-orm";
import { TOKENS } from "@/core/utils/tokens";




@injectable()
export class AddressRepository implements IAddressInterface {

    constructor(@inject(TOKENS.DB) private db:DbOrTx ){}

    async createAddress(data: CreateAddressType): Promise<AddressRow> {
          const [address] = await this.db.insert(Addresses).values({
                      addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 ?? null,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
          addressType: data.addressType,
          ownerType: data.ownerType, 
          }).returning();
          return address
    }
   async  updateAddress(addressId: string, data: UpdateAddressType): Promise<AddressRow> {
            const [update] = await this.db.update(Addresses)
                                           .set({...data, updatedAt : new Date()})
                                           .where(eq(Addresses.addressId, addressId))
                                           .returning()
             return update;                              
    }
  async   fetchAddressOnly(addressId: string): Promise<AddressRow | null> {
        const [address] = await this.db.select().from(Addresses)
                             .where(eq(Addresses.addressId, addressId))
                             .limit(1)  
        return address ?? null;                          
    }

   
async fetchAllAddresses(
  limit: number,
  offset: number,
  page: number
): Promise<PaginatedAddressResult> {
  // 1. Fetch paginated addresses
  const addresses = await this.db
    .select()
    .from(Addresses)
    .limit(limit)
    .offset(offset);

  // 2. Count total rows
  const [{ count }] = await this.db
    .select({ count: sql<number>`count(*)` })
    .from(Addresses);

  // 3. Calculate pagination meta
  const totalRecords = Number(count);
  const totalPages = Math.ceil(totalRecords / limit);

  // 4. Return result
  return {
    data: addresses,
    totalRecords,
    currentPage: page,
    totalPages,
  };
}
    async deleteAddress(addressId: string): Promise<number> {
                 const result = await this.db.delete(Addresses)
                                                   .where(eq(sql`${Addresses.addressId}`,addressId))
                       return result.rowCount ?? 0
    }
     
}