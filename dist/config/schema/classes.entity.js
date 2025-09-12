"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRelations = exports.classes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const student_entity_1 = require("./student.entity");
const teacher_entity_1 = require("./teacher.entity");
const enums_1 = require("./enums");
exports.classes = (0, pg_core_1.pgTable)("classes", {
    classId: (0, pg_core_1.uuid)("classId").defaultRandom().primaryKey(),
    // enum for class names (LKG, I, II, ..., X)
    name: (0, enums_1.classNameEnum)("name").notNull(),
    nameText: (0, pg_core_1.text)("name_text").notNull().default((0, drizzle_orm_1.sql) `''`), // optional default
    code: (0, pg_core_1.varchar)("code", { length: 50 }).notNull(),
    capacity: (0, pg_core_1.integer)("capacity").default(0),
    description: (0, pg_core_1.text)("description"),
    status: (0, enums_1.classStatusEnum)("status").notNull(),
    teacherId: (0, pg_core_1.varchar)("teacher_id", { length: 36 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow().notNull(),
    createdBy: (0, pg_core_1.uuid)("createdBy"),
    updatedBy: (0, pg_core_1.uuid)("updatedBy"),
}, (table) => [
    // B-Tree indexes
    (0, pg_core_1.index)("idx_classes_code").using("btree", table.code),
    (0, pg_core_1.index)("idx_classes_status").using("btree", table.status),
    // ✅ safe indexes on generated columns
    (0, pg_core_1.index)("idx_classes_name_text_lower").using("btree", (0, drizzle_orm_1.sql) `lower(${table.nameText})`),
    (0, pg_core_1.index)("idx_classes_code_lower").using("btree", (0, drizzle_orm_1.sql) `lower(${table.code})`),
]);
exports.classesRelations = (0, drizzle_orm_1.relations)(exports.classes, ({ many, one }) => ({
    students: many(student_entity_1.Student), // FK exists in Student.classId
    teacher: one(teacher_entity_1.Teachers), // FK exists in classes.teacherId
}));
