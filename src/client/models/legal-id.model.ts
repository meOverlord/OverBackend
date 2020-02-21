import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LegalId{
    @IsString()
    @prop({ required: true })
	@Field()
    id: string;
    
    @IsString()
    @prop()
	@Field()
	type?: string;
}
