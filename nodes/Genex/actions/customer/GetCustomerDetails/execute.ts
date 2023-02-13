import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest, parseCustomer } from '../../../transport';

export async function GetCustomerDetails(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await apiRequest.call(this, 'Customer', 'Service', 'GetCustomerDetails', {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
	}) as any;

	const rawData = responseData['CustomerData'];

	const data = parseCustomer(rawData);

	return this.helpers.returnJsonArray(data as IDataObject);
}
