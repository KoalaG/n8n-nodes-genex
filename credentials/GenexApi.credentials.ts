import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GenexApi implements ICredentialType {
	name = 'genexApi';
	displayName = 'Genex API';
	documentationUrl = 'https://github.com/KoalaG/n8n-nodes-genex';
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://genexapi.billing.com.au/',
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
	];

}
