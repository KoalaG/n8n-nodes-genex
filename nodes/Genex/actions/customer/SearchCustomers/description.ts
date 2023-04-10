import type { CustomerProperties } from '../../Interfaces';

export const SearchCustomersDescription: CustomerProperties = [
	{
		displayName: 'Search String',
		name: 'SearchString',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [ 'customer' ],
				operation: [ 'SearchCustomers' ],
			},
		},
		default: ''
	},

	{
		displayName: 'Include Cancelled',
		name: 'IncludeCancelled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [ 'customer' ],
				operation: [ 'SearchCustomers' ],
			},
		},
		default: false
	}
];
