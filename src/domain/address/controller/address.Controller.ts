import { inject, injectable } from "tsyringe";
import { AddressServiceImpl } from "../service/address.Service";
import { FastifyReply, FastifyRequest } from "fastify";
import { HTTPSTATUS } from "@/core/utils/https.config";
import { CreateAddressType, UpdateAddressType } from "../dto/addressDto";
import { TOKENS } from "@/core/utils/tokens";

type AddressParams = {
  id: string;
};

@injectable()
export class AddressController {
  constructor(
    @inject(TOKENS.AddressService) private service: AddressServiceImpl
  ) {}

  onCreateAddresOnly = async (
    req: FastifyRequest<{ Body: CreateAddressType }>,
    reply: FastifyReply
  ): Promise<void> => {
    const data = req.body;
    try {
      const address = await this.service.OnCreateAddress(data);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "Address created successfully",
        data: address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onUpdateAddresOnly = async (
    req: FastifyRequest<{ Body: UpdateAddressType; Params: AddressParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: addressId } = req.params;
    const body = req.body;
    try {
      const update = await this.service.OnUpdateAddress(addressId, body);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "Address updated successfully",
        data: update,
      });
    } catch (error) {
      console.log(error);
    }
  };

  OnFetchAddress = async (
    req: FastifyRequest<{ Params: AddressParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: addressId } = req.params;
    try {
      const address = await this.service.OnFetchAddress(addressId);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "fetch address successfully !!",
        data: address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  OnFetchAllAddress = async (
    req: FastifyRequest<{ Querystring: { limit?: number; page?: number } }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { limit = "10", page = "1" } = req.query;
    const limitNum = Number(limit) || 10;
  const pageNum = Number(page) || 1;

  const offset = (pageNum - 1) * limitNum;


 
    try {
        const addresses   =  await this.service.OnFetchAllAddress(limitNum, offset, pageNum);
        reply.status(HTTPSTATUS.OK).send({
             success:true,
             message:"Address fetch successfully",
             data:addresses
        })
    } catch (error) {
      console.log(error);
    }
  };

  OnDeleteAddress = async (
    req: FastifyRequest<{ Params: AddressParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: addressId } = req.params;

    try {
      const address = await this.service.OnDeleteAddress(addressId);
      reply.status(HTTPSTATUS.NO_CONTENT).send({
        success: true,
        message: "Delete address successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
