import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class LegalId{
    @IsString()
    @prop({ required: true })
    id: string;
    
    @IsString()
    @prop()
	type?: string;
}
