"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../core/utils/AppError");
const globalErrorHandler = (err, req, reply) => {
    if (err instanceof AppError_1.AppError) {
        reply.status(err.statusCode).send({
            status: 'error',
            statusCode: err.statusCode || 500,
            errorCode: err.errorCode,
            message: err.message || "Something went wrong!",
        });
    }
    else {
        console.error("Unhandled Error: ", err);
        reply.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: 'error',
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong!',
        });
    }
};
exports.default = globalErrorHandler;
