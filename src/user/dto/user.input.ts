import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput{
    @Field()
    name: string;
    @Field({nullable: true})
    email?: string;
    @Field({nullable: true})
    password?: string;
}