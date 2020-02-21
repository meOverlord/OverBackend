import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Arg, Args } from 'type-graphql';
import { ClientNotFoundException, ClientsNotRetrivableException } from '../exceptions/client.exception';
import { Client } from '../models';
import { ClientService, FindAllClientsInput } from '../services/client';
import { textChangeRangeIsUnchanged } from 'typescript';


@Resolver(of => Client)
export class ClientResolver {

    constructor(
        private clientService: ClientService){}

    @Query(returns => Client)
    public client(@Arg('id') id: string): Observable<Client> {
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
    public clients(@Args(){ skip, take }: FindAllClientsInput): Observable<Array<Client>>{
        return this.clientService.findAll({skip, take}).pipe(
            map(clients => {
                if(!clients){
                    throw new ClientsNotRetrivableException();
                }
                return clients as Array<Client>;
            })
        );
    }


  @Mutation(returns => Client)
  public createClient(){
    return null;
  }
}
