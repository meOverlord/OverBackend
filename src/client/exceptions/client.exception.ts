import { AppException, ErrorCodes } from "src/exceptions";

export class ClientNotFoundException extends AppException{
    constructor(private id: string){
        super(
            ErrorCodes.CLIENT_NOT_FOUND, 'user not found', [id.toString()]);
    }
}

export class ClientsNotRetrivableException extends AppException{
    constructor(){
        super(ErrorCodes.CLIENT_CREATION_ERROR, 'user creation impossible');
    }
}
