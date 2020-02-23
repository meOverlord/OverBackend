import { AppException, ErrorCodes } from "src/exceptions";
import { HttpStatus } from "@nestjs/common";

export class AuthCredentialException extends AppException{
    constructor(){
        super(HttpStatus.BAD_REQUEST, ErrorCodes.AUTH_CREDENTIAL_ERROR)
    }
}

export class AuthUnauthorizedException extends AppException{
    constructor(){
        super(HttpStatus.UNAUTHORIZED, ErrorCodes.AUTH_UNAUTHORIZED_ERROR)
    } 
}
