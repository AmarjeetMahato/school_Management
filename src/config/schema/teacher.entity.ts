import {
  pgTable,
  varchar,
  timestamp,
  date,
  pgEnum,
  index,
  uuid,
} from "drizzle-orm/pg-core";
import {  sql } from "drizzle-orm";
import { genderEnum, statusEnum } from "./enums";


export const Teachers = pgTable(
  "teachers",
  {
    teacherId: uuid("teacherId").defaultRandom().primaryKey(),

    firstName: varchar("first_name", { length: 100 }).notNull(),
    middleName: varchar("middle_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }).notNull(),

    email: varchar("email", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 20 }),

    dateOfBirth: date("date_of_birth").notNull(),
    gender: genderEnum("gender").notNull(),

    qualification: varchar("qualification", { length: 200 }).notNull(),
    profilePic: varchar("profile_pic"),

    hireDate: date("hire_date").notNull(),
    status: statusEnum("status").notNull(),
     classId: varchar("class_id", { length: 36 }),
     addressId: varchar("address_id", { length: 36 }),
       createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
       createdBy: uuid("createdBy"),
      updatedBy: uuid("updatedBy"),

  },
  (table) => [
    // Advanced B-Tree indexes
    index("idx_teachers_first_name")
      .using("btree", table.firstName.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_last_name")
      .using("btree", table.lastName.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_email")
      .using("btree", table.email.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_phone")
      .using("btree", table.phone.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_dob")
      .using("btree", table.dateOfBirth.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_hire_date")
      .using("btree", table.hireDate.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_gender")
      .using("btree", table.gender.asc())
      .with({ fillfactor: "70" }),

    index("idx_teachers_status")
      .using("btree", table.status.asc())
      .with({ fillfactor: "70" }),

    // Optional: functional index for case-insensitive search on firstName + lastName
    index("idx_teachers_name_lower")
      .using("btree", sql`lower(${table.firstName})`, sql`lower(${table.lastName})`)
      .with({ fillfactor: "70" }),
  ]
);



export type TeacherRow = typeof Teachers.$inferSelect
