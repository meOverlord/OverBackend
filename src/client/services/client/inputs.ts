import { Client } from './../../models/client.model';

export type CreateClientInput = Pick<Client, 'name' | 'userId'>;