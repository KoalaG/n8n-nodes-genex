import type { INodeProperties } from 'n8n-workflow';

import * as methods from './methods';
export { methods };

export const descriptions: INodeProperties[] = [

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: [ 'customer' ], },
		},
		options: [

			methods.SearchCustomers.operation,
			methods.GetCustomerDetails.operation,
			methods.GetExternalSystemReference.operation,
			methods.SetExternalSystemReference.operation,
			methods.UpdateAccountDetails.operation,
			methods.UpdateCustomerFlags.operation,

		],

		default: '',

	},

	...methods.SearchCustomers.description,
	...methods.GetCustomerDetails.description,
	...methods.GetExternalSystemReference.properties,
	...methods.SetExternalSystemReference.properties,
	...methods.UpdateAccountDetails.properties,
	...methods.UpdateCustomerFlags.properties,

];
