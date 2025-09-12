"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentSchema = void 0;
exports.createStudentSchema = {
    body: {
        type: "object",
        required: [
            "firstName",
            "lastName",
            "gender",
            "dateOfBirth",
            "rollNumber",
            "admissionDate",
            "classId"
        ],
        properties: {
            firstName: { type: "string", minLength: 1 },
            middleName: { type: "string" },
            lastName: { type: "string", minLength: 1 },
            gender: { type: "string", enum: ["MALE", "FEMALE", "OTHER"] },
            dateOfBirth: { type: "string", format: "date" },
            rollNumber: { type: "integer", minimum: 1 },
            admissionDate: { type: "string", format: "date" },
            isActive: { type: "boolean", default: true },
            createdBy: { type: "string", format: "uuid" },
            updatedBy: { type: "string", format: "uuid" },
            addressId: { type: "string", format: "uuid" },
            classId: { type: "string", format: "uuid" },
        },
        additionalProperties: false,
    },
};
exports.updateStudentSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" },
        },
    },
    body: {
        type: "object",
        properties: {
            firstName: { type: "string", minLength: 1 },
            middleName: { type: "string" },
            lastName: { type: "string", minLength: 1 },
            gender: { type: "string", enum: ["MALE", "FEMALE", "OTHER"] },
            dateOfBirth: { type: "string", format: "date-time" },
            rollNumber: { type: "integer", minimum: 1 },
            admissionDate: { type: "string", format: "date-time" },
            isActive: { type: "boolean" },
            createdBy: { type: "string", format: "uuid" },
            updatedBy: { type: "string", format: "uuid" },
            addressId: { type: "string", format: "uuid" },
            classId: { type: "string", format: "uuid" },
        },
        additionalProperties: false, // don't allow extra fields
    },
};
