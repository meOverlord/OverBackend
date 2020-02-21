import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Client, LegalId } from './models';
import { ClientService } from './services/client/client.service';
import { ClientResolver } from './resolvers';

@Module({
    imports: [TypegooseModule.forFeature([Client, LegalId])],
    providers: [ClientService, ClientResolver]
})
export class ClientModule {}
