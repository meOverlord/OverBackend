import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlAuthGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/strategies';
import { CurrentUser } from 'src/user/decorators';
import { CreateClient } from './../dto/create-client.dto';
import { Client } from './../models/client.model';
import { ClientService } from './../services/client/client.service';



@Resolver(of => Client)
export class CreateClientResolver {

	constructor(
		private clientService: ClientService) { }

	@Mutation(returns => Client)
	@UseGuards(GqlAuthGuard)
	public createClient(
		@Args('input') input: CreateClient,
		@CurrentUser() payload: JwtPayload): Observable<Client> {
			
		return this.clientService.create({...input, userId: payload._id});
	}
}
