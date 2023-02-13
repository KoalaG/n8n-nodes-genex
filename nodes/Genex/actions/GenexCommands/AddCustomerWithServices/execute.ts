import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function GetCustomerDetails(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await apiRequest.call(this, 'Customer', 'Service', 'GetCustomerDetails', {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
	}) as any;

	const rawData = responseData['soap:Envelope']['soap:Body']['GetCustomerDetailsResponse']['GetCustomerDetailsResult']['CustomerData'];
	console.log(rawData);

	const data = sanitizeRawData(rawData);

	return this.helpers.returnJsonArray(data as IDataObject);
}


function sanitizeRawData(rawData: any) {
	const data: any = {};

	for (const key in rawData) {
		if (rawData.hasOwnProperty(key)) {

			const value = rawData[key];

			if (value['_attributes'] && value['_attributes']['xsi:nil'] === 'true') {
				data[key] = null;
			}

			else if (value['_text']) {
				data[key] = value['_text'];
			}

			else if (typeof value === 'object' && value !== null) {
				data[key] = sanitizeRawData(value);
			}

			else {
				data[key] = value;
			}

		}
	}

	return data;
}
