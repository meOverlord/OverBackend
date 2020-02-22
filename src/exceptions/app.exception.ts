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

    USER_CREATION_EXCEPTION = 200,
}
