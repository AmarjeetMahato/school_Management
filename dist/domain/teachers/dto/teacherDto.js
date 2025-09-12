"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherSchema = exports.createTeacherSchema = void 0;
exports.createTeacherSchema = {
    body: {
        type: "object",
        required: [
            "firstName",
            "lastName",
            "email",
            "phone",
            "qualification", // required in entity
            "gender", // required in entity
            "dateOfBirth", // required in entity
            "hireDate", // required in entity
            "status" // required in entity
        ],
        properties: {
            firstName: { type: "string", minLength: 1, maxLength: 100 },
            middleName: { type: "string", nullable: true },
            lastName: { type: "string", minLength: 1, maxLength: 100 },
            email: { type: "string", format: "email" },
            phone: {
                type: "string",
                pattern: "^[0-9]{10,15}$", // basic phone validation
            },
            qualification: { type: "string", minLength: 1, maxLength: 200 },
            gender: { type: "string", enum: ["MALE", "FEMALE", "OTHER"] },
            dateOfBirth: { type: "string", format: "date" },
            hireDate: { type: "string", format: "date" },
            status: { type: "string", enum: ["ACTIVE", "INACTIVE", "SUSPENDED"] },
            profilePic: { type: "string", nullable: true },
            classId: { type: "string", minLength: 36, maxLength: 36, nullable: true },
            addressId: { type: "string", minLength: 36, maxLength: 36, nullable: true },
        },
        additionalProperties: false,
    },
};
exports.updateTeacherSchema = {
    body: {
        type: "object",
        properties: {
            firstName: { type: "string", minLength: 1, maxLength: 150 },
            middleName: { type: "string", nullable: true },
            lastName: { type: "string", minLength: 1, maxLength: 150 },
            email: { type: "string", format: "email" },
            phone: { type: "string", minLength: 10, maxLength: 15 },
            address: { type: "string" },
            qualification: { type: "string" },
            experience: { type: "number", minimum: 0 },
            subject: { type: "string", minLength: 1, maxLength: 100 },
            status: { type: "string", enum: ["ACTIVE", "INACTIVE", "SUSPENDED"] },
            classId: { type: "string", minLength: 36, maxLength: 36, nullable: true },
            addressId: { type: "string", minLength: 36, maxLength: 36, nullable: true },
        },
        required: [],
        additionalProperties: false,
    },
};
