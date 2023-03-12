import type { IExecuteFunctions } from 'n8n-core';

import type { INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function GetCustomerDetails(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await apiRequest.call(this, 'Customer', 'Service', 'GetCustomerDetails', {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
	}) as any;


	return this.helpers.returnJsonArray(responseData);

}
