import { HttpException } from "@nestjs/common";

export class  AppException extends HttpException{

    constructor(httpCode: number, code?: ErrorCodes, message?: string, params?: Array<string>){
        super({
            code,
            message,
            params,
        }, httpCode);
    }
}

export enum ErrorCodes {
    CLIENT_NOT_FOUND = 100,
    CLIENT_CREATION_ERROR = 101,

    USER_CREATION_ERROR = 200,

    AUTH_CREDENTIAL_ERROR = 300,
    AUTH_UNAUTHORIZED_ERROR = 301,
}

export const ErrorMap = new Map<ErrorCodes, string>([
    [ErrorCodes.CLIENT_NOT_FOUND, 'CLIENT_NOT_FOUND'],
    [ErrorCodes.CLIENT_CREATION_ERROR, 'CLIENT_CREATION_ERROR'],
    [ErrorCodes.USER_CREATION_ERROR, 'USER_CREATION_ERROR'],
    [ErrorCodes.AUTH_CREDENTIAL_ERROR, 'AUTH_CREDENTIAL_ERROR'],
    [ErrorCodes.AUTH_UNAUTHORIZED_ERROR, 'AUTH_UNAUTHORIZED_ERROR'],
]);

