"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRelations = exports.Student = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const classes_entity_1 = require("./classes.entity");
const address_entity_1 = require("./address.entity");
const enums_1 = require("./enums");
exports.Student = (0, pg_core_1.pgTable)("student", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 250 }).notNull(),
    middleName: (0, pg_core_1.varchar)("middle_name", { length: 250 }),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 250 }).notNull(),
    gender: (0, enums_1.genderEnum)("gender").notNull(),
    dateOfBirth: (0, pg_core_1.timestamp)("date_of_birth", { withTimezone: false }).notNull(),
    rollNumber: (0, pg_core_1.integer)("roll_number").notNull(),
    admissionDate: (0, pg_core_1.timestamp)("admission_date", { withTimezone: false }).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    createdBy: (0, pg_core_1.uuid)("created_by"),
    updatedBy: (0, pg_core_1.uuid)("updated_by"),
    addressId: (0, pg_core_1.varchar)("address_id", { length: 36 }),
    classId: (0, pg_core_1.varchar)("class_id", { length: 36 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
}, (table) => [
    (0, pg_core_1.index)('idx_students_firstName_lower')
        .using("btree", (0, drizzle_orm_1.sql) `lower(${table.firstName}) ASC`)
        .where((0, drizzle_orm_1.sql) `${table.isActive}=true`)
        .with({ fillfactor: "70" }),
    // rollNumber index with ascending order
    (0, pg_core_1.index)("idx_students_rollno")
        .using("btree", table.rollNumber.asc())
        .with({ fillfactor: "70" }),
    // dateOfBirth index, descending order
    (0, pg_core_1.index)("idx_students_dob")
        .using("btree", table.dateOfBirth.desc())
        .with({ fillfactor: "70" }),
    // admissionDate index, ascending
    (0, pg_core_1.index)("idx_students_admissiondate")
        .using("btree", table.admissionDate.asc())
        .with({ fillfactor: "70" }),
    // gender index, ascending
    (0, pg_core_1.index)("idx_students_gender")
        .using("btree", table.gender.asc())
        .with({ fillfactor: "70" }),
]);
exports.studentsRelations = (0, drizzle_orm_1.relations)(exports.Student, ({ one }) => ({
    class: one(classes_entity_1.classes), // FK exists in Student.classId
    address: one(address_entity_1.Addresses), // FK exists in Student.addressId
}));
