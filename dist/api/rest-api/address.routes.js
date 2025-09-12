"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoutes = addressRoutes;
const address_Controller_1 = require("../../domain/address/controller/address.Controller");
const addressDto_1 = require("../../domain/address/dto/addressDto");
const tsyringe_1 = require("tsyringe");
async function addressRoutes(fastify) {
    const addressController = tsyringe_1.container.resolve(address_Controller_1.AddressController);
    fastify.post("/create", { schema: addressDto_1.createAddressSchema }, addressController.onCreateAddresOnly);
    fastify.get("/get-all-address", addressController.OnFetchAllAddress);
    fastify.patch("/:id/update", { schema: addressDto_1.updateAddressSchema }, addressController.onUpdateAddresOnly);
    fastify.get("/:id/get-address", addressController.OnFetchAddress);
    fastify.delete("/:id/delete", addressController.OnDeleteAddress);
}
