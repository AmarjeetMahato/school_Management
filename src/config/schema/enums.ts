import { pgEnum } from "drizzle-orm/pg-core";


export const addressOwnerEnum = pgEnum("address_owner_type", ["STUDENT", "TEACHER", "OTHER"]);
// Optional enum for status
export const classStatusEnum = pgEnum("class_status", ["ACTIVE", "INACTIVE", "ARCHIVED"]);
export const classNameEnum = pgEnum("class_name", ["LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X"]);
export const genderEnum = pgEnum("gender",["MALE", "FEMALE", "OTHER"])
// Status enum (active/inactive/other)
export const statusEnum = pgEnum("status", ["ACTIVE", "INACTIVE", "SUSPENDED"]);

