"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRelations = exports.Addresses = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const teacher_entity_1 = require("./teacher.entity");
const classes_entity_1 = require("./classes.entity");
const enums_1 = require("./enums");
// Enum for address owner type
exports.Addresses = (0, pg_core_1.pgTable)("addresses", {
    addressId: (0, pg_core_1.uuid)("address_id").defaultRandom().primaryKey(),
    addressLine1: (0, pg_core_1.varchar)("address_line_1", { length: 250 }).notNull(),
    addressLine2: (0, pg_core_1.varchar)("address_line_2", { length: 250 }),
    city: (0, pg_core_1.varchar)("city", { length: 100 }).notNull(),
    state: (0, pg_core_1.varchar)("state", { length: 100 }).notNull(),
    country: (0, pg_core_1.varchar)("country", { length: 100 }).notNull(),
    ownerType: (0, enums_1.addressOwnerEnum)("owner_type").notNull(),
    postalCode: (0, pg_core_1.varchar)("postal_code", { length: 20 }).notNull(),
    addressType: (0, pg_core_1.varchar)("address_type", { length: 50 }).notNull(),
    createdBy: (0, pg_core_1.uuid)("created_by"),
    updatedBy: (0, pg_core_1.uuid)("updated_by"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
}, (table) => [
    // Advanced B-Tree indexes
    (0, pg_core_1.index)("idx_address_line1")
        .using("btree", table.addressLine1)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_city")
        .using("btree", table.city)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_state")
        .using("btree", table.state)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_country")
        .using("btree", table.country)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_postal_code")
        .using("btree", table.postalCode)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_address_type")
        .using("btree", table.addressType)
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_address_owner_type")
        .using("btree", table.ownerType)
        .with({ fillfactor: "70" }),
    // Optional functional index for case-insensitive city + state search
    (0, pg_core_1.index)("idx_address_city_state_lower")
        .using("btree", (0, drizzle_orm_1.sql) `lower(${table.city})`, (0, drizzle_orm_1.sql) `lower(${table.state})`)
        .with({ fillfactor: "70" }),
]);
exports.addressesRelations = (0, drizzle_orm_1.relations)(teacher_entity_1.Teachers, ({ many, one }) => ({
    classes: many(classes_entity_1.classes), // FK exists in classes.teacherId
    address: one(exports.Addresses), // FK exists in teachers.addressId
}));
