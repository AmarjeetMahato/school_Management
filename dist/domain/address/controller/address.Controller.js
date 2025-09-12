"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const tsyringe_1 = require("tsyringe");
const address_Service_1 = require("../service/address.Service");
const https_config_1 = require("../../../core/utils/https.config");
const tokens_1 = require("../../../core/utils/tokens");
let AddressController = class AddressController {
    service;
    constructor(service) {
        this.service = service;
    }
    onCreateAddresOnly = async (req, reply) => {
        const data = req.body;
        try {
            const address = await this.service.OnCreateAddress(data);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Address created successfully",
                data: address,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onUpdateAddresOnly = async (req, reply) => {
        const { id: addressId } = req.params;
        const body = req.body;
        try {
            const update = await this.service.OnUpdateAddress(addressId, body);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Address updated successfully",
                data: update,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    OnFetchAddress = async (req, reply) => {
        const { id: addressId } = req.params;
        try {
            const address = await this.service.OnFetchAddress(addressId);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "fetch address successfully !!",
                data: address,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    OnFetchAllAddress = async (req, reply) => {
        const { limit = "10", page = "1" } = req.query;
        const limitNum = Number(limit) || 10;
        const pageNum = Number(page) || 1;
        const offset = (pageNum - 1) * limitNum;
        try {
            const addresses = await this.service.OnFetchAllAddress(limitNum, offset, pageNum);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Address fetch successfully",
                data: addresses
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    OnDeleteAddress = async (req, reply) => {
        const { id: addressId } = req.params;
        try {
            const address = await this.service.OnDeleteAddress(addressId);
            reply.status(https_config_1.HTTPSTATUS.NO_CONTENT).send({
                success: true,
                message: "Delete address successfully",
            });
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.AddressController = AddressController;
exports.AddressController = AddressController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.AddressService)),
    __metadata("design:paramtypes", [address_Service_1.AddressServiceImpl])
], AddressController);
