import { IsString } from 'class-validator';
import { prop } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

import { LegalId } from "./legal-id.model";

@ObjectType()
export class Client{
    
    @IsString()
    @prop({required: true})
    @Field(type => ID)
    id: string;

    @IsString()
    @prop({required: true})
	@Field()
    name: string;
    
    @IsString()
    @prop({required: false})
    @Field({ nullable: true })
	preferedLanguage?: string;

    @IsString()
    @prop({required: false})
	@Field(type => [LegalId])
    legalIds?: Array<LegalId>;
    
    @IsString()
    @prop({required: true})
    @Field()
    userId: string;
}