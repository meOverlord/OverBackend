import { ArgumentsHost, Catch } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { AppException, ErrorMap } from "./app.exception";

@Catch(AppException)
export class AppGqlExceptionFilter implements GqlExceptionFilter{

    catch(exception: AppException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        return exception;
      }
}

export function formatGraphQlError(err: GraphQLError): GraphQLError {
    let payload: any;
    if(err.originalError instanceof AppException){
        const appEx = err.originalError as AppException;
        payload = appEx.getResponse();
    }
    return new GraphQLError(
        err.message,
        undefined,//nodes
        undefined,//source
        undefined,//positions
        err.path,
        err.originalError,
        payload
    );
}

