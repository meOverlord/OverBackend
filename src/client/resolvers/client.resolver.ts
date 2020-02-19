import { Resolver, Query, Args } from '@nestjs/graphql';
import { Client } from '../models';
import { Arg } from 'type-graphql';
import { map } from 'rxjs/operators';

import { ClientService, FindAllClientsInput } from '../services/client';
import { ClientNotFoundException, ClientsNotRetrivableException } from '../exceptions/client.exception';
import { Observable } from 'rxjs';

@Resolver(Client)
export class ClientResolver {

    constructor(
        private clientService: ClientService){}

    @Query(returns => Client)
    public client(@Arg('id') id: string) {
        return this.clientService.findById(id).pipe(
            map(client => {
                if(!client){
                    throw new ClientNotFoundException(id);
                }
                return client;
            })
        );
    }

    @Query(returns => [Client])
    public clients(@Args()
     { skip, take }: FindAllClientsInput): Observable<Array<Client>>{
        return this.clientService.findAll({skip, take}).pipe(
            map(clients => {
                if(!clients){
                    throw new ClientsNotRetrivableException();
                }
                return clients as Array<Client>;
            })
        );
    }
}