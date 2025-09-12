import { FromSchema } from "json-schema-to-ts";

// Create Address Schema
export const createAddressSchema = {
  body: {
    type: "object",
    required: [
      "addressLine1",
      "city",
      "state",
      "country",
      "postalCode",
      "addressType",
      "ownerType"
    ],
    properties: {
      addressLine1: { type: "string", minLength: 1, maxLength: 250 },
      addressLine2: { type: "string", maxLength: 250 },
      city: { type: "string", minLength: 1, maxLength: 100 },
      state: { type: "string", minLength: 1, maxLength: 100 },
      country: { type: "string", minLength: 1, maxLength: 100 },
      postalCode: { type: "string", minLength: 1, maxLength: 20 },
      addressType: { type: "string", minLength: 1, maxLength: 50 },
      ownerType: { type: "string", enum: ["STUDENT", "TEACHER", "OTHER"] },
    },
    additionalProperties: false,
  },
} as const;

// Update Address Schema
export const updateAddressSchema = {
  body: {
    type: "object",
    properties: {
      addressLine1: { type: "string", minLength: 1, maxLength: 250 },
      addressLine2: { type: "string", maxLength: 250 },
      city: { type: "string", minLength: 1, maxLength: 100 },
      state: { type: "string", minLength: 1, maxLength: 100 },
      country: { type: "string", minLength: 1, maxLength: 100 },
      postalCode: { type: "string", minLength: 1, maxLength: 20 },
      addressType: { type: "string", minLength: 1, maxLength: 50 },
      ownerType: { type: "string", enum: ["STUDENT", "TEACHER", "OTHER"] },
    },
    additionalProperties: false,
  },
} as const;

// Types
export type CreateAddressType = FromSchema<typeof createAddressSchema["body"]>;
export type UpdateAddressType = FromSchema<typeof updateAddressSchema["body"]>;
