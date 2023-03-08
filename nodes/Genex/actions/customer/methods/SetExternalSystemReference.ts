
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { CustomerProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'SetExternalSystemReference';
const PARSER = transport.parseGeneric;

export const operation: INodePropertyOptions = {
	name: 'Set External System Reference',
	value: METHOD,
	description:
		'This web method is used to set/update reference ID, from an external system, for a Genex customer. This reference ID is the link between the two systems (Genex and third party system) and used for any further interaction between the systems.',
	action: 'Set external system reference',
};

export const properties: CustomerProperties = [
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
		name: 'ExternalSystem',
		type: 'string',
		default: '',
		required: true,
		description: 'Identifier for the system. These values are case sensitive and should be entered as supplied.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'External Reference',
		name: 'ExternalReference',
		type: 'string',
		default: '',
		description: 'Genex does not validate the data in this field and expects it to match the identifier in the external system',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		Reference: {
			CustomerNumber: this.getNodeParameter('CustomerNumber', index),
			ExternalSystem: this.getNodeParameter('ExternalSystem', index),
			ExternalReference: this.getNodeParameter('ExternalReference', index) || null,
		}
	});

	return this.helpers.returnJsonArray(PARSER(responseData));

}
