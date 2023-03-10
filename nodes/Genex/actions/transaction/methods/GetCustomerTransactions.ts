
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { TransactionProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'GetCustomerTransactions';

export const operation: INodePropertyOptions = {
	name: 'Get Customer Transactions',
	value: METHOD,
	description: 'Retrieve list of historical transactions for a customer',
	action: 'Get customer transactions',
};

export const properties: TransactionProperties = [
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

	return this.helpers.returnJsonArray(responseData);

}
