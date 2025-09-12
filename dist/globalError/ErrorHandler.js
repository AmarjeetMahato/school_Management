"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = exports.InternalServerException = exports.UnauthorizedException = exports.BadRequestException = exports.AlreadyExistsException = exports.NotFoundException = void 0;
const AppError_1 = require("../core/utils/AppError");
const https_config_1 = require("../core/utils/https.config");
class NotFoundException extends AppError_1.AppError {
    constructor(message = "RESOURCE_NOT_FOUND" /* Message.RESOURCE_NOT_FOUND */, errorCode) {
        super(message, https_config_1.HTTPSTATUS.NOT_FOUND, errorCode || "RESOURCE_NOT_FOUND" /* Message.RESOURCE_NOT_FOUND */);
    }
}
exports.NotFoundException = NotFoundException;
class AlreadyExistsException extends AppError_1.AppError {
    constructor(message = "STUDENT_ALREADY_EXISTS" /* Message.STUDENT_ALREADY_EXISTS */, errorCode) {
        super(message, https_config_1.HTTPSTATUS.NOT_FOUND, errorCode || "STUDENT_ALREADY_EXISTS" /* Message.STUDENT_ALREADY_EXISTS */);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;
class BadRequestException extends AppError_1.AppError {
    constructor(message = "BAD REQUEST" /* Message.BAD_REQUEST */, errorCode) {
        super(message, https_config_1.HTTPSTATUS.BAD_REQUEST, errorCode);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends AppError_1.AppError {
    constructor(message = "ACCESS_UNAUTHORIZED" /* Message.ACCESS_UNAUTHORIZED */, errorCode) {
        super(message, https_config_1.HTTPSTATUS.UNAUTHORIZED, errorCode || "ACCESS_UNAUTHORIZED" /* Message.ACCESS_UNAUTHORIZED */);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class InternalServerException extends AppError_1.AppError {
    constructor(message = "INTERNAL_SERVER_ERROR" /* Message.INTERNAL_SERVER_ERROR */, errorCode) {
        super(message, https_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || "INTERNAL_SERVER_ERROR" /* Message.INTERNAL_SERVER_ERROR */);
    }
}
exports.InternalServerException = InternalServerException;
class HttpException extends AppError_1.AppError {
    constructor(message = "Http Exception Error", statusCode, errorCode) {
        super(message, statusCode, errorCode);
    }
}
exports.HttpException = HttpException;
