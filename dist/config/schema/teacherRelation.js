"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachersRelations = void 0;
// relations.ts
const drizzle_orm_1 = require("drizzle-orm");
const teacher_entity_1 = require("./teacher.entity");
const classes_entity_1 = require("./classes.entity");
const address_entity_1 = require("./address.entity");
exports.teachersRelations = (0, drizzle_orm_1.relations)(teacher_entity_1.Teachers, ({ many, one }) => ({
    classes: many(classes_entity_1.classes),
    address: one(address_entity_1.Addresses, {
        fields: [teacher_entity_1.Teachers.addressId],
        references: [address_entity_1.Addresses.addressId],
    }),
}));
