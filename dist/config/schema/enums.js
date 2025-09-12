"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusEnum = exports.genderEnum = exports.classNameEnum = exports.classStatusEnum = exports.addressOwnerEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.addressOwnerEnum = (0, pg_core_1.pgEnum)("address_owner_type", ["STUDENT", "TEACHER", "OTHER"]);
// Optional enum for status
exports.classStatusEnum = (0, pg_core_1.pgEnum)("class_status", ["ACTIVE", "INACTIVE", "ARCHIVED"]);
exports.classNameEnum = (0, pg_core_1.pgEnum)("class_name", ["LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]);
exports.genderEnum = (0, pg_core_1.pgEnum)("gender", ["MALE", "FEMALE", "OTHER"]);
// Status enum (active/inactive/other)
exports.statusEnum = (0, pg_core_1.pgEnum)("status", ["ACTIVE", "INACTIVE", "SUSPENDED"]);
