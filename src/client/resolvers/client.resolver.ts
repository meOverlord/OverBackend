import { GqlAuthGuard } from 'src/auth/guards';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtPayload } from 'src/auth/strategies';
import { CurrentUser } from 'src/user/decorators';
import { Arg, Args } from 'type-graphql';
import { ClientNotFoundException, ClientsNotRetrivableException } from '../exceptions/client.exception';
import { Client } from '../models';
import { ClientService, FindAllClientsInput } from '../services/client';


@Resolver(of => Client)
export class ClientResolver {

    constructor(
        private clientService: ClientService){}

	@Query(returns => Client)
	@UseGuards(GqlAuthGuard)
    public client(
		@CurrentUser() payload: JwtPayload,
		@Arg('id') id: number): Observable<Client> {
        return this.clientService.findById(payload._id, id).pipe(
            map(client => {
                if(!client){
                    throw new ClientNotFoundException(id);
                }
                return client;
            })
        );
    }

	@Query(returns => [Client])
	@UseGuards(GqlAuthGuard)
    public clients(
		@CurrentUser() payload: JwtPayload,
		@Args()input?: FindAllClientsInput): Observable<Array<Client>>{
		return this.clientService.findAll(payload._id, input || {}).pipe(
            map(clients => {
                if(!clients){
                    throw new ClientsNotRetrivableException();
                }
                return clients as Array<Client>;
            })
        );
    }
}
