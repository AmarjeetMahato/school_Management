import { AddressController } from "@/domain/address/controller/address.Controller";
import { createAddressSchema, updateAddressSchema } from "@/domain/address/dto/addressDto";
import { FastifyInstance } from "fastify";
import { container } from "tsyringe";




export async function addressRoutes(fastify:FastifyInstance){

    const addressController = container.resolve(AddressController);
    
    fastify.post("/create",{schema:createAddressSchema},addressController.onCreateAddresOnly)
    fastify.get("/get-all-address",addressController.OnFetchAllAddress)
    fastify.patch("/:id/update",{schema:updateAddressSchema},addressController.onUpdateAddresOnly)
    fastify.get("/:id/get-address",addressController.OnFetchAddress)
    fastify.delete("/:id/delete",addressController.OnDeleteAddress)
}