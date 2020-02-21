import { IsDate, IsString, IsNumber } from 'class-validator';
import { prop, plugin } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { AutoIncrementSimplePluginOptions, AutoIncrementSimple } from '@typegoose/auto-increment';

@ObjectType()
@plugin<AutoIncrementSimplePluginOptions>(
    AutoIncrementSimple, [{ field: "id" }]
)
export class User{
    
    @IsNumber()
    @prop()
    @Field(type => ID)
    id: number;

    @IsString()
    @prop()
	@Field()
    name?: string;

    @IsString()
    @prop()
	@Field({nullable: true})
    email?: string;

    @IsString()
    @prop({required: false})
	@Field({nullable: true})
    password?: string;

    @IsDate()
    @prop({required: true, default: Date.now()})
	@Field()
    inscriptionDate: Date;
}