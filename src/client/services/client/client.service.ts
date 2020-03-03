import { CreateClientInput } from './inputs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Client } from 'src/client/models';
import { FindAllClientsInput } from './';
import { Observable, from } from 'rxjs';


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private readonly clientModel: ReturnModelType<typeof Client>
    ) {}

    public create(createClientDto: CreateClientInput): Observable<Client> {
        const createdClient = new this.clientModel(createClientDto);
        return from(createdClient.save() as Promise<Client>);
    }

	public findById(owner: number,id: number): Observable<Client>{
        return this.clientModel.findOne({
			id,
			userId: owner,
		}).toObservable();
    }

    public findAll(owner: number, input?: FindAllClientsInput): Observable<Array<Client> | null>{
        const skip = input?.skip  || 0;
        const limit = input?.take || 20;
		return from(this.clientModel.find({userId: owner}, undefined, {
            skip, limit
		}).exec() as Promise<Array<Client> | null>);
    }
}
