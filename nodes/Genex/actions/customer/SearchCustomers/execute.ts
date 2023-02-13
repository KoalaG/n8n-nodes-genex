import type { IExecuteFunctions } from 'n8n-core';
import type { IDataObject, INodeExecutionData } from 'n8n-workflow';
import { apiRequest, parseCustomerList as PARSER } from '../../../transport';

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

	const rawData = responseData['soap:Envelope']['soap:Body'];
	const data = PARSER(rawData['CustomerList']['Customer']) as IDataObject[];

	return this.helpers.returnJsonArray(data);
}
