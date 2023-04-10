
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateServiceName';

export const operation: INodePropertyOptions = {
	name: 'Update Service Name',
	value: METHOD,
	description: 'This web method is used to update the Name field associated with a service',
	action: 'Update service name',
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
		description: 'Genex service number (Service Nofield in Service Details section of Services screen) associated to the Customer. Service must exist in Genex and should not be released.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Name',
		name: 'Name',
		type: 'string',
		default: '',
		required: true,
		description: 'Value to be updated into the Name field',
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
		TelstraAccNo: this.getNodeParameter('TelstraAccNo', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
