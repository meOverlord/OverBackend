import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Client, LegalId } from './models';
import { ClientService } from './services/client/client.service';
import { ClientResolver, CreateClientResolver } from './resolvers';

@Global()
@Module({
    imports: [TypegooseModule.forFeature([Client, LegalId])],
    providers: [ClientService, ClientResolver, CreateClientResolver]
})
export class ClientModule {}
