export class AppException extends Error{
    private _code: ErrorCodes;
    private _params: Array<string>;

    constructor(code?: ErrorCodes, message?: string, params?: Array<string>){
        super(message)
        this._code = code;
        this._params = params;
    }

    public get code(): number{
        return this._code;
    }
    public get params(): Array<string>{
        return this._params;
    }
}

export enum ErrorCodes {
    CLIENT_NOT_FOUND = 100,
    CLIENT_CREATION_ERROR = 101,

    USER_CREATION_ERROR = 200,

    AUTH_CREDENTIAL_ERROR = 300,
}

export const ErrorMap = new Map<ErrorCodes, string>([
    [ErrorCodes.CLIENT_NOT_FOUND, 'CLIENT_NOT_FOUND'],
    [ErrorCodes.CLIENT_CREATION_ERROR, 'CLIENT_CREATION_ERROR'],
    [ErrorCodes.USER_CREATION_ERROR, 'USER_CREATION_ERROR'],
    [ErrorCodes.AUTH_CREDENTIAL_ERROR, 'AUTH_CREDENTIAL_ERROR'],
]);

