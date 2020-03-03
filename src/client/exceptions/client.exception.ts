import { AppException, ErrorCodes } from "src/exceptions";
import { HttpStatus } from "@nestjs/common";

export class ClientNotFoundException extends AppException{
    constructor(private id: number){
        super(
            HttpStatus.NOT_FOUND,
            ErrorCodes.CLIENT_NOT_FOUND, 'user not found', [id.toString()]);
    }
}

export class ClientsNotRetrivableException extends AppException{
    constructor(){
        super(
            HttpStatus.NOT_FOUND,
            ErrorCodes.CLIENT_CREATION_ERROR, 'user creation impossible');
    }
}
