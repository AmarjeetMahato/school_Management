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
exports.AddressRepository = void 0;
const tsyringe_1 = require("tsyringe");
const address_entity_1 = require("../../../config/schema/address.entity");
const drizzle_orm_1 = require("drizzle-orm");
const tokens_1 = require("../../../core/utils/tokens");
let AddressRepository = class AddressRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createAddress(data) {
        const [address] = await this.db.insert(address_entity_1.Addresses).values({
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 ?? null,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
            addressType: data.addressType,
            ownerType: data.ownerType,
        }).returning();
        return address;
    }
    async updateAddress(addressId, data) {
        const [update] = await this.db.update(address_entity_1.Addresses)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(address_entity_1.Addresses.addressId, addressId))
            .returning();
        return update;
    }
    async fetchAddressOnly(addressId) {
        const [address] = await this.db.select().from(address_entity_1.Addresses)
            .where((0, drizzle_orm_1.eq)(address_entity_1.Addresses.addressId, addressId))
            .limit(1);
        return address ?? null;
    }
    async fetchAllAddresses(limit, offset, page) {
        // 1. Fetch paginated addresses
        const addresses = await this.db
            .select()
            .from(address_entity_1.Addresses)
            .limit(limit)
            .offset(offset);
        // 2. Count total rows
        const [{ count }] = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(address_entity_1.Addresses);
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
    async deleteAddress(addressId) {
        const result = await this.db.delete(address_entity_1.Addresses)
            .where((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `${address_entity_1.Addresses.addressId}`, addressId));
        return result.rowCount ?? 0;
    }
};
exports.AddressRepository = AddressRepository;
exports.AddressRepository = AddressRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.DB)),
    __metadata("design:paramtypes", [Object])
], AddressRepository);
