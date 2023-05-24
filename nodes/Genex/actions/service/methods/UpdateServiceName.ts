
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';
import { CustomerNumber, ServiceNumber } from '../../CommonFields';

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

	CustomerNumber(METHOD),
	ServiceNumber(METHOD),

	{
		displayName: 'Name',
		name: 'Name',
		type: 'string',
		default: '',
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
		Name: this.getNodeParameter('Name', index) || '',
	});

	return this.helpers.returnJsonArray(responseData);

}
