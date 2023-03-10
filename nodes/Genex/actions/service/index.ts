import * as methods from './methods';
import type { INodeProperties } from 'n8n-workflow';

export { methods };


export const descriptions: INodeProperties[] = [

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: [ 'service' ], },
		},
		options: [

			{
				name: 'Search',
				value: 'SearchServices',
				description: 'Search for a service',
				action: 'Search for a service',
			},

			methods.SearchServices.operation,
			methods.GetCustomerServices.operation,

		],

		default: 'SearchServices',

	},

	...methods.SearchServices.properties,
	...methods.GetCustomerServices.properties,

];
