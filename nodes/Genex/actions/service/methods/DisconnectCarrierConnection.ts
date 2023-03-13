
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'DisconnectCarrierConnection';

export const operation: INodePropertyOptions = {
	name: 'Disconnect Carrier Connection',
	value: METHOD,
	description:
		'This web method is used to disconnect active connection of a service',
	action: 'Disconnect carrier connection',
};

export const properties: ServiceProperties = [
	{
		displayName: 'Customer Number',
		name: 'CustomerNumber',
		type: 'number',
		default: '',
		required: true,
		description: 'Must be a valid Genex customer number',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'ServiceNumber',
		name: 'System',
		type: 'string',
		default: '',
		required: true,
		description: 'Genex service number (Service Nofield in Service Details section of Services screen)associated to the Customer. Service must exist in Genex and should not be released.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Carrier',
		name: 'Carrier',
		type: 'string',
		default: '',
		required: true,
		description: 'Reference code from Carrierdata structure',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Disconnection Date',
		name: 'DisconnectionDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'The date from which service should be disconnected. Date can be in past or future.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Send Disconnection Request',
		name: 'SendDisconnectionRequest',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether Genex should send disconnection request, in provisioning file, to carrier? Only applicable for carriers where provisioning supported through Genex',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		Carrier: this.getNodeParameter('Carrier', index),
		DisconnectionDate: this.getNodeParameter('DisconnectionDate', index),
		SendDisconnectionRequest: this.getNodeParameter('SendDisconnectionRequest', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
