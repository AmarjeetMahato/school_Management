import { relations, sql } from "drizzle-orm";
import {
  varchar,
  pgTable,
  uuid,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { classes } from "./classes.entity";
import { Addresses } from "./address.entity";
import { genderEnum } from "./enums";


export const Student = pgTable("student", {
    id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 250 }).notNull(),
  middleName: varchar("middle_name", { length: 250 }),
  lastName: varchar("last_name", { length: 250 }).notNull(),

  gender: genderEnum("gender").notNull(),
  dateOfBirth: timestamp("date_of_birth", { withTimezone: false }).notNull(),
  rollNumber: integer("roll_number").notNull(),
  admissionDate: timestamp("admission_date", { withTimezone: false }).notNull(),

  isActive: boolean("is_active").default(true).notNull(),
  createdBy: uuid("created_by"),
  updatedBy: uuid("updated_by"),
  addressId: varchar("address_id", { length: 36 }),
  classId: varchar("class_id", { length: 36 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

}, (table)=>[
     
     index('idx_students_firstName_lower')
       .using("btree", sql`lower(${table.firstName}) ASC`)
       .where(sql`${table.isActive}=true`)
       .with({ fillfactor: "70" }),

    // rollNumber index with ascending order
  index("idx_students_rollno")
    .using("btree", table.rollNumber.asc())
    .with({ fillfactor: "70" }),

  // dateOfBirth index, descending order
  index("idx_students_dob")
    .using("btree", table.dateOfBirth.desc())
    .with({ fillfactor: "70" }),

  // admissionDate index, ascending
  index("idx_students_admissiondate")
    .using("btree", table.admissionDate.asc())
    .with({ fillfactor: "70" }),

  // gender index, ascending
  index("idx_students_gender")
    .using("btree", table.gender.asc())
    .with({ fillfactor: "70" }),   

]);


export const studentsRelations = relations(Student, ({ one }) => ({
  class: one(classes),    // FK exists in Student.classId
  address: one(Addresses), // FK exists in Student.addressId
}));



export type StudentRow = typeof Student.$inferSelect


