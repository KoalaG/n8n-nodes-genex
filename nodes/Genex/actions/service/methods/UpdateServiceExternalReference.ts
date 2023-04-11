
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';
import { CustomerNumber, ServiceNumber, TelstraAccNo } from '../../CommonFields';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateServiceExternalReference';

export const operation: INodePropertyOptions = {
	name: 'Update Service External Reference',
	value: METHOD,
	action: 'Update service external reference',
};

export const properties: ServiceProperties = [

	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	TelstraAccNo(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		TelstraAccNo: this.getNodeParameter('TelstraAccNo', index) || '',
	});

	return this.helpers.returnJsonArray(responseData);

}
