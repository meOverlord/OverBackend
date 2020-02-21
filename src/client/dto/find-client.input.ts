import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class FindAllClientsInput{
    @Field(type => Int, { defaultValue: 0 })
    @Min(0)
    skip?: number;

    @Field(type => Int, { defaultValue: 20 })
    @Min(1)
    @Max(42)
    take?: number;
}
