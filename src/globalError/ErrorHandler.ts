import { AppError } from "../core/utils/AppError";
import { Message } from "../core/utils/ErrorCode.message";
import { HTTPSTATUS, HttpStatusCode } from "../core/utils/https.config";




export class NotFoundException extends AppError {
       constructor(
           message:string =Message.RESOURCE_NOT_FOUND,
           errorCode?: Message
       ){
           super(
            message,
            HTTPSTATUS.NOT_FOUND,
             errorCode || Message.RESOURCE_NOT_FOUND ) 
       }
}



export class AlreadyExistsException extends AppError {
  constructor(message:string = Message.STUDENT_ALREADY_EXISTS, errorCode?: Message) {
    super(
      message,
      HTTPSTATUS.NOT_FOUND,
      errorCode || Message.STUDENT_ALREADY_EXISTS
    );
  }
}

export class BadRequestException extends AppError {
  constructor(message:string = Message.BAD_REQUEST, errorCode?: Message) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message:string = Message.ACCESS_UNAUTHORIZED, errorCode?: Message) {
    super(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      errorCode || Message.ACCESS_UNAUTHORIZED
    );
  }
}

export class InternalServerException extends AppError {
  constructor(message:string = Message.INTERNAL_SERVER_ERROR, errorCode?: Message) {
    super(
      message,
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      errorCode || Message.INTERNAL_SERVER_ERROR
    );
  }
}

export class HttpException extends AppError {
  constructor(
    message = "Http Exception Error",
    statusCode: HttpStatusCode,
    errorCode?: Message
  ) {
    super(message, statusCode, errorCode);
  }
}