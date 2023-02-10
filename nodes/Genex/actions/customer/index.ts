import * as GetCustomerDetails from './GetCustomerDetails';
import type { INodeProperties } from 'n8n-workflow';

export { GetCustomerDetails };

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

			{
				name: 'Get',
				value: 'GetCustomerDetails',
				description: 'Add a user to a channel',
				action: 'Add a user to a channel',
			},

		],

		default: 'GetCustomerDetails',

	},

	...GetCustomerDetails.description,
];
