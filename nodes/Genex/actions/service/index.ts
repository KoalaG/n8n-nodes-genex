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

			methods.SearchServices.operation,
			methods.GetCustomerServices.operation,
			methods.UpdateServiceRatePlan.operation,
			methods.ReleaseService.operation,
			methods.DisconnectCarrierConnection.operation,

		],

		default: '',

	},

	...methods.SearchServices.properties,
	...methods.GetCustomerServices.properties,
	...methods.UpdateServiceRatePlan.properties,
	...methods.ReleaseService.properties,
	...methods.DisconnectCarrierConnection.properties,
];
