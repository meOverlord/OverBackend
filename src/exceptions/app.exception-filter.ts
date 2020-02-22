import { Catch, ArgumentsHost } from "@nestjs/common";
import { AppException } from "./app.exception";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@Catch(AppException)
export class AppExceptionFilter implements GqlExceptionFilter{

    catch(exception: AppException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        return exception;
      }
}

export function formatGraphQlError(err: GraphQLError): GraphQLError {
    let code, params;
        if(err.originalError instanceof AppException){
            const appEx = err.originalError as AppException;
            code = appEx.code.toString();
            params = appEx.params;
        }
        return new GraphQLError(
            err.message,
            undefined,//nodes
            undefined,//source
            undefined,//positions
            err.path,
            err.originalError,
            {
                code, params
            }
        );
}

