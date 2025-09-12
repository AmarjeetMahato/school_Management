import { FromSchema } from "json-schema-to-ts";



export const createClassSchema = {
  body: {
    type: "object",
    required: ["name", "code", "status","capacity"],
    properties: {
      name: { type: "string", minLength: 1, maxLength: 150 },
      code: { type: "string", minLength: 1, maxLength: 50 },
      description: { type: "string", nullable: true },
      status: { type: "string", enum: ["ACTIVE", "INACTIVE", "ARCHIVED"] },
      teacherId: { type: "string", minLength: 36, maxLength: 36, nullable: true },
      capacity: { type: "integer", minimum: 0 } 
    },
    additionalProperties: false,
  },
} as const;

export const updateClassSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 150 },
      code: { type: "string", minLength: 1, maxLength: 50 },
      description: { anyOf: [{ type: "string" }, { type: "null" }] },
      status: { type: "string", enum: ["ACTIVE", "INACTIVE", "ARCHIVED"] },
      teacherId: { anyOf: [{ type: "string", minLength: 36, maxLength: 36 }, { type: "null" }] },
      capacity: { anyOf: [{ type: "integer", minimum: 0 }, { type: "null" }] } // ✅ Added capacity
    },
    additionalProperties: false,
  },
} as const;



export type CreateClassesType = FromSchema<typeof createClassSchema["body"]>
export type UpdateClassesType = FromSchema<typeof updateClassSchema["body"]>
