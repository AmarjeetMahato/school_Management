"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.createAddressSchema = void 0;
// Create Address Schema
exports.createAddressSchema = {
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
};
// Update Address Schema
exports.updateAddressSchema = {
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
};
