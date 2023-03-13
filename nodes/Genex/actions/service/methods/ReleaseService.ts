
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'ReleaseService';

export const operation: INodePropertyOptions = {
	name: 'Release Service',
	value: METHOD,
	description:
		'This web method is used to release a service.Only one instance of non-released service number (phone number/email address/ip address/domain name/subscriber identifier) can exist in Genex. Use this web method to release a service if a customer cancels the service/account. This will ensure that in future the same service number can be added again in Genex, in case of change of ownership etc., on another account.',
	action: 'Release service',
};

export const properties: ServiceProperties = [
	{
		displayName: 'Customer Number',
		name: 'CustomerNumber',
		type: 'number',
		default: 0,
		required: true,
		description: 'Must be a valid Genex customer number',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Service Number',
		name: 'ServiceNumber',
		type: 'string',
		default: '',
		required: true,
		description: 'Genex service number (Service Nofield in Service Details section of Services screen) associated to the Customer.  Service must exist in Genex and should not be released',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Release Date',
		name: 'ReleaseDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: '',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Disconnection Date',
		name: 'DisconnectionDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: '',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Send Disconnection Request',
		name: 'SendDisconnectionRequest',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Should Genex send disconnection request, in provisioning file, to carrier? Only applicable for carriers where provisioning supported through Genex.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		System: this.getNodeParameter('System', index),
	});

	return this.helpers.returnJsonArray(responseData);
}
