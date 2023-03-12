import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../../transport';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const ACTION = 'SearchCustomers';

export async function SearchCustomers(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await apiRequest.call(this, ENDPOINT, SUBENDPOINT, ACTION, {
		SearchString: this.getNodeParameter('SearchString', index),
	});

	return this.helpers.returnJsonArray(responseData);
}
