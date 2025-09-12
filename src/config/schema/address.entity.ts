import { pgTable, varchar, pgEnum, index, uuid ,timestamp} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { Student } from "./student.entity";
import { Teachers } from "./teacher.entity";
import { classes } from "./classes.entity";
import { addressOwnerEnum } from "./enums";

// Enum for address owner type

export const Addresses = pgTable(
  "addresses",
  {
    addressId: uuid("address_id").defaultRandom().primaryKey(),

    addressLine1: varchar("address_line_1", { length: 250 }).notNull(),
    addressLine2: varchar("address_line_2", { length: 250 }),

    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),

    ownerType: addressOwnerEnum("owner_type").notNull(),

    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    addressType: varchar("address_type", { length: 50 }).notNull(),
      createdBy: uuid("created_by"),
     updatedBy: uuid("updated_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Advanced B-Tree indexes
    index("idx_address_line1")
      .using("btree", table.addressLine1)
      .with({ fillfactor: "70" }),

    index("idx_address_city")
      .using("btree", table.city)
      .with({ fillfactor: "70" }),

    index("idx_address_state")
      .using("btree", table.state)
      .with({ fillfactor: "70" }),

    index("idx_address_country")
      .using("btree", table.country)
      .with({ fillfactor: "70" }),

    index("idx_address_postal_code")
      .using("btree", table.postalCode)
      .with({ fillfactor: "70" }),

    index("idx_address_address_type")
      .using("btree", table.addressType)
      .with({ fillfactor: "70" }),

    index("idx_address_owner_type")
      .using("btree", table.ownerType)
      .with({ fillfactor: "70" }),

    // Optional functional index for case-insensitive city + state search
    index("idx_address_city_state_lower")
      .using("btree", sql`lower(${table.city})`, sql`lower(${table.state})`)
      .with({ fillfactor: "70" }),
  ]
);



export const addressesRelations = relations(Teachers, ({ many, one }) => ({
  classes: many(classes), // FK exists in classes.teacherId
  address: one(Addresses), // FK exists in teachers.addressId
}));



export type AddressRow =  typeof Addresses.$inferSelect