import * as GetCustomerDetails from './GetCustomerDetails';
import * as SearchCustomers from './SearchCustomers';

import type { INodeProperties } from 'n8n-workflow';

export { GetCustomerDetails, SearchCustomers};

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
				name: 'Search',
				value: 'SearchCustomers',
				description: 'Search for a customer',
				action: 'Search for a customer',
			},

			{
				name: 'Get',
				value: 'GetCustomerDetails',
				description: 'Add a user to a channel',
				action: 'Add a user to a channel',
			},

		],

		default: 'SearchCustomers',

	},

	...SearchCustomers.description,
	...GetCustomerDetails.description,

];
