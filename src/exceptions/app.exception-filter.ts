import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { AppException, ErrorMap } from "./app.exception";
import { Response } from "express";

@Catch(AppException)
export class AppGqlExceptionFilter implements GqlExceptionFilter{

    catch(exception: AppException, host: ArgumentsHost) {
        return exception;
      }
}

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const errorMessage = ErrorMap.get(exception.code);
    response
      .status(statusCode)
      .json({...(exception.getResponse() as object), statusCode, errorMessage});
  }
}

export function formatGraphQlError(err: GraphQLError): GraphQLError {
    let payload: any;
    let errorMessage: string;
    if(err.originalError instanceof AppException){
        const appEx = err.originalError as AppException;
        payload = appEx.getResponse();
        errorMessage = ErrorMap.get(appEx.code);
    }
    return new GraphQLError(
        err.message,
        undefined,//nodes
        undefined,//source
        undefined,//positions
        err.path,
        err.originalError,
        {...payload, errorMessage}
    );
}

