"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const https_config_1 = require("./https.config");
class AppError extends Error {
    statusCode;
    errorCode;
    constructor(message, statusCode = https_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
