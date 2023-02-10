import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type GenexMap = {
	customer: 'GetCustomerDetails';
	message: 'delete' | 'post' | 'postEphemeral';
	reaction: 'create' | 'delete' | 'getAll';
	user: 'create' | 'deactive' | 'getAll' | 'getByEmail' | 'getById' | 'invite';
};

export type Genex = AllEntities<GenexMap>;

export type GenexCustomerService = Entity<GenexMap, 'customer'>;
export type MattermostMessage = Entity<GenexMap, 'message'>;
export type MattermostReaction = Entity<GenexMap, 'reaction'>;
export type MattermostUser = Entity<GenexMap, 'user'>;

export type CustomerProperties = PropertiesOf<GenexCustomerService>;
export type MessageProperties = PropertiesOf<MattermostMessage>;
export type ReactionProperties = PropertiesOf<MattermostReaction>;
export type UserProperties = PropertiesOf<MattermostUser>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
