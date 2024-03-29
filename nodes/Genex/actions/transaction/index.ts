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
			show: { resource: [ 'transaction' ], },
		},
		options: [

			methods.AddTransaction.operation,
			methods.GetCustomerTransactions.operation,

		],

		default: '',

	},

	...methods.AddTransaction.properties,
	...methods.GetCustomerTransactions.properties,

];
