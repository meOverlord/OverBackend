import { AutoIncrementID, AutoIncrementOptionsID } from '@typegoose/auto-increment';
import { plugin, prop, pre } from '@typegoose/typegoose';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Query } from 'mongoose';

@ObjectType()
@plugin<AutoIncrementOptionsID>(AutoIncrementID)
@pre<User>('save', preSave)
export class User{
    
    @IsNumber()
    @prop()
    @Field(type => ID)
    _id!: number;

    @IsString()
    @prop({unique: true})
	@Field()
    name!: string;

    @IsString()
    @prop({unique : true})
    nameLower!: string;

    @IsString()
    @prop({unique: true})
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

function preSave<User>(this: Query<User>, next){
    this.nameLower = this.name?.toLowerCase();
    next();
}
