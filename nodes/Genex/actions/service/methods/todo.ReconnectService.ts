
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'ReconnectService';

export const operation: INodePropertyOptions = {
	name: 'Get External System Reference',
	value: METHOD,
	description:
		'This web method is used to retrieve external system’s reference ID for a Genex customer. This reference ID is the link between the two systems (Genex and third party system) and used for any further interaction between the systems. The current set of external systems are: Ezidebit and Xero.',
	action: 'Get external system reference',
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
		displayName: 'System',
		name: 'System',
		type: 'string',
		default: '',
		required: true,
		description: 'Identifier for the system. These values are case sensitive and should be entered as supplied.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
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
