import {
  pgTable,
  varchar,
  text,
  uuid,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { Student } from "./student.entity";
import { Teachers } from "./teacher.entity";
import { classNameEnum, classStatusEnum } from "./enums";

export const classes = pgTable(
  "classes",
  {
    classId: uuid("classId").defaultRandom().primaryKey(),

    // enum for class names (LKG, I, II, ..., X)
    name: classNameEnum("name").notNull(),
    nameText: text("name_text").notNull().default(sql`''`), // optional default
    code: varchar("code", { length: 50 }).notNull(),
    capacity: integer("capacity").default(0),
    description: text("description"),
    status: classStatusEnum("status").notNull(),
    teacherId: varchar("teacher_id", { length: 36 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdBy: uuid("createdBy"),
    updatedBy: uuid("updatedBy"),
  },
  (table) => [
    // B-Tree indexes
    index("idx_classes_code").using("btree", table.code),
    index("idx_classes_status").using("btree", table.status),

    // ✅ safe indexes on generated columns
    index("idx_classes_name_text_lower").using("btree", sql`lower(${table.nameText})`),
    index("idx_classes_code_lower").using("btree", sql`lower(${table.code})`),
  ]
);

export const classesRelations = relations(classes, ({ many, one }) => ({
  students: many(Student), // FK exists in Student.classId
  teacher: one(Teachers),  // FK exists in classes.teacherId
}));

export type ClassRow = typeof classes.$inferSelect;
