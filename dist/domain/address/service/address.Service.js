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
exports.AddressServiceImpl = void 0;
const tsyringe_1 = require("tsyringe");
const ErrorHandler_1 = require("../../../globalError/ErrorHandler");
const tokens_1 = require("../../../core/utils/tokens");
let AddressServiceImpl = class AddressServiceImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async OnCreateAddress(data) {
        const address = await this.repo.createAddress(data);
        if (!address?.addressId) {
            throw new ErrorHandler_1.BadRequestException(`Failed to Create Address`);
        }
        return address;
    }
    async OnUpdateAddress(address_id, data) {
        if (!address_id) {
            throw new ErrorHandler_1.BadRequestException(`Address_id should not be null`);
        }
        const update = await this.repo.updateAddress(address_id, data);
        if (!update?.addressId) {
            throw new ErrorHandler_1.BadRequestException(`Failed to Update Address`);
        }
        return update;
    }
    async OnFetchAddress(addressId) {
        if (!addressId) {
            throw new ErrorHandler_1.BadRequestException(`Address_id should not be null`);
        }
        const address = await this.repo.fetchAddressOnly(addressId);
        if (!address?.addressId) {
            throw new ErrorHandler_1.NotFoundException(`Address not found with Id: ${addressId} `);
        }
        return address;
    }
    async OnFetchAllAddress(limit, offset, page) {
        const address = await this.repo.fetchAllAddresses(limit, offset, page);
        if (!address.data || address.data.length == 0) {
            throw new ErrorHandler_1.NotFoundException(`No Address found`);
        }
        return address;
    }
    async OnDeleteAddress(addressId) {
        if (!addressId) {
            throw new ErrorHandler_1.BadRequestException(`Address_id should not be null`);
        }
        const address = await this.repo.fetchAddressOnly(addressId);
        if (!address?.addressId) {
            throw new ErrorHandler_1.NotFoundException(`Address not found with Id: ${addressId} `);
        }
        return await this.repo.deleteAddress(addressId);
    }
};
exports.AddressServiceImpl = AddressServiceImpl;
exports.AddressServiceImpl = AddressServiceImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.AddressRepository)),
    __metadata("design:paramtypes", [Object])
], AddressServiceImpl);
