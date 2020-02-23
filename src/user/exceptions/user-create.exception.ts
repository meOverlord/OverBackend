import { AppException, ErrorCodes } from "src/exceptions";
import { HttpStatus } from "@nestjs/common";

export class CreateUserException  extends AppException{
    constructor(error: UserCreationErrorCodes | Array<UserCreationErrorCodes>){
        if(!(error instanceof Array)){
            error = [error];
        }
        super(
            HttpStatus.BAD_REQUEST,
            ErrorCodes.USER_CREATION_ERROR,
            'user creation error',
            (error as Array<UserCreationErrorCodes>).map(
                code => code.toString()
        ));
    }
}

export enum UserCreationErrorCodes {
    MISSING_USERNAME    = '1: missing username',
    MISSING_EMAIL       = '2: missing username',
    MISSING_PASSWORD    = '3: missing username',
    WEAK_PASSWORD       = '4: weak password',
}
