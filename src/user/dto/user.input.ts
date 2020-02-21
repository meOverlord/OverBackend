import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateUserInput{
    @Field()
    name: string;
    @Field({nullable: true})
    email?: string;
    @Field({nullable: true})
    password?: string;
}