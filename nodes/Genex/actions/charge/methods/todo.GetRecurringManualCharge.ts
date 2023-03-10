
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'GetCustomerServices';
const PARSER = transport.parseServiceList;

export const operation: INodePropertyOptions = {
	name: 'Get Customer Services',
	value: METHOD,
	description:
		'This web method is used to get a list of all services associated with a customer/account. The response lists all services (including released) on the account and all associated connections for each service.',
	action: 'Get customer services',
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
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
	});

	return this.helpers.returnJsonArray(PARSER(responseData));

}
