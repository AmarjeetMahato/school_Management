import {FastifyError,FastifyRequest,FastifyReply} from "fastify"
import { StatusCodes } from 'http-status-codes';
import { AppError } from "../core/utils/AppError";

const globalErrorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
): void => {
  if (err instanceof AppError) {
    reply.status(err.statusCode).send({
      status: 'error',
      statusCode: err.statusCode || 500,
      errorCode: err.errorCode,
      message: err.message || "Something went wrong!",
    });
  } else {
    console.error("Unhandled Error: ", err);

    reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'error',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong!',
    });
  }
};

export default globalErrorHandler;
