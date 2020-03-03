import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateClient{
	@Field()
	name: string;
}
