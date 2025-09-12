"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teachers = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const enums_1 = require("./enums");
exports.Teachers = (0, pg_core_1.pgTable)("teachers", {
    teacherId: (0, pg_core_1.uuid)("teacherId").defaultRandom().primaryKey(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 100 }).notNull(),
    middleName: (0, pg_core_1.varchar)("middle_name", { length: 100 }),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 100 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 150 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }),
    dateOfBirth: (0, pg_core_1.date)("date_of_birth").notNull(),
    gender: (0, enums_1.genderEnum)("gender").notNull(),
    qualification: (0, pg_core_1.varchar)("qualification", { length: 200 }).notNull(),
    profilePic: (0, pg_core_1.varchar)("profile_pic"),
    hireDate: (0, pg_core_1.date)("hire_date").notNull(),
    status: (0, enums_1.statusEnum)("status").notNull(),
    classId: (0, pg_core_1.varchar)("class_id", { length: 36 }),
    addressId: (0, pg_core_1.varchar)("address_id", { length: 36 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow().notNull(),
    createdBy: (0, pg_core_1.uuid)("createdBy"),
    updatedBy: (0, pg_core_1.uuid)("updatedBy"),
}, (table) => [
    // Advanced B-Tree indexes
    (0, pg_core_1.index)("idx_teachers_first_name")
        .using("btree", table.firstName.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_last_name")
        .using("btree", table.lastName.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_email")
        .using("btree", table.email.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_phone")
        .using("btree", table.phone.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_dob")
        .using("btree", table.dateOfBirth.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_hire_date")
        .using("btree", table.hireDate.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_gender")
        .using("btree", table.gender.asc())
        .with({ fillfactor: "70" }),
    (0, pg_core_1.index)("idx_teachers_status")
        .using("btree", table.status.asc())
        .with({ fillfactor: "70" }),
    // Optional: functional index for case-insensitive search on firstName + lastName
    (0, pg_core_1.index)("idx_teachers_name_lower")
        .using("btree", (0, drizzle_orm_1.sql) `lower(${table.firstName})`, (0, drizzle_orm_1.sql) `lower(${table.lastName})`)
        .with({ fillfactor: "70" }),
]);
