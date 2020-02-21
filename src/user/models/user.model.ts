import { AutoIncrementID, AutoIncrementOptionsID } from '@typegoose/auto-increment';
import { plugin, prop } from '@typegoose/typegoose';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';


@ObjectType()
@plugin<AutoIncrementOptionsID>(AutoIncrementID)
export class User{
    
    @IsNumber()
    @prop()
    @Field(type => ID)
    _id: number;

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
