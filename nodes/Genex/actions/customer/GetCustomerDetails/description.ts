import type { CustomerProperties } from '../../Interfaces';

export const GetCustomerDetailsDescription: CustomerProperties = [
	{
		displayName: 'Customer Number',
		name: 'CustomerNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [ 'customer' ],
				operation: [ 'GetCustomerDetails' ],
			},
		},
		default: ''
	}
];
