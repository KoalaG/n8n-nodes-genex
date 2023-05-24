
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';
import { CustomerNumber } from '../../CommonFields';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'GetCustomerServices';

export const operation: INodePropertyOptions = {
	name: 'Get Customer Services',
	value: METHOD,
	action: 'Get customer services',
};

export const properties: ServiceProperties = [
	CustomerNumber(METHOD)
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
