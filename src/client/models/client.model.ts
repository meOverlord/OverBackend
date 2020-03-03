import { AutoIncrementOptionsID, AutoIncrementID } from '@typegoose/auto-increment';
import { IsString, IsNumber } from 'class-validator';
import { prop, plugin } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

import { LegalId } from "./legal-id.model";

@ObjectType()
@plugin<AutoIncrementOptionsID>(AutoIncrementID)
export class Client{
    
    @IsNumber()
    @prop()
    @Field(type => ID)
    _id: number;

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
    
    @IsNumber()
    @prop({required: true})
    @Field()
    userId: number;
}