import { AppException, ErrorCodes } from "src/exceptions";

export class ClientNotFoundException extends AppException{
    constructor(private id: string){
        super(
            404,
            ErrorCodes.CLIENT_NOT_FOUND, 'user not found', [id.toString()]);
    }
}

export class ClientsNotRetrivableException extends AppException{
    constructor(){
        super(
            404,
            ErrorCodes.CLIENT_CREATION_ERROR, 'user creation impossible');
    }
}
