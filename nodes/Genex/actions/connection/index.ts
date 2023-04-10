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
			show: { resource: [ 'connection' ], },
		},
		options: [

			methods.AddConnection.operation,
			methods.DisconnectCarrierConnection.operation,
			methods.DisconnectCarrierConnectionWithDisconnectionReason.operation,

		],

		default: '',

	},

	...methods.AddConnection.properties,
	...methods.DisconnectCarrierConnection.properties,
	...methods.DisconnectCarrierConnectionWithDisconnectionReason.properties,

];
