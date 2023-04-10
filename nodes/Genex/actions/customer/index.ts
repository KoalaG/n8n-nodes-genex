import * as GetCustomerDetails from './GetCustomerDetails';
import * as SearchCustomers from './SearchCustomers';
import * as GetExternalSystemReference from './methods/GetExternalSystemReference';
import * as SetExternalSystemReference from './methods/SetExternalSystemReference';

import type { INodeProperties } from 'n8n-workflow';

export { GetCustomerDetails, SearchCustomers, GetExternalSystemReference, SetExternalSystemReference };

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

			SearchCustomers.operation,
			GetCustomerDetails.operation,
			GetExternalSystemReference.operation,
			SetExternalSystemReference.operation,

		],

		default: '',

	},

	...SearchCustomers.description,
	...GetCustomerDetails.description,
	...GetExternalSystemReference.properties,
	...SetExternalSystemReference.properties,

];
