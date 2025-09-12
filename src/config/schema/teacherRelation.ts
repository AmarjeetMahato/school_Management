// relations.ts
import { relations } from "drizzle-orm";
import { Teachers } from "./teacher.entity";
import { classes } from "./classes.entity";
import { Addresses } from "./address.entity";

export const teachersRelations = relations(Teachers, ({ many, one }) => ({
  classes: many(classes),
  address: one(Addresses, {
    fields: [Teachers.addressId],
    references: [Addresses.addressId],
  }),
}));