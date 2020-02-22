import { AppException, ErrorCodes } from "src/exceptions";

export class AuthCredentialException extends AppException{
    constructor(){
        super(ErrorCodes.AUTH_CREDENTIAL_ERROR)
    }
}
