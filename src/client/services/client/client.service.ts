import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Client } from 'src/client/models';
import { FindAllClientsInput } from './';
import { Observable } from 'rxjs';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private readonly clientModel: ReturnModelType<typeof Client>
    ) {}

    public create(createClientDto: { name: string }): Observable<Client> {
        const createdClient = new this.clientModel(createClientDto);
        return createdClient.save().toObservable();
    }

    public findById(id: string): Observable<Client>{
        return this.clientModel.findById(id).toObservable();
    }

    public findAll(input?: FindAllClientsInput): Observable<Array<Client> | null>{
        const skip = input?.skip  || 0;
        const limit = input?.take || 20;
        return this.clientModel.findAll(undefined, undefined, {
            skip, limit
        }).exec().toObservable();
    }
}
