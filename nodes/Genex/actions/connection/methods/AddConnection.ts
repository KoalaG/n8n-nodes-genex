
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConnectionProperties } from '../../Interfaces';
import { Carrier, CustomerNumber, DateProvisioned, DeclaredDate, ServiceNumber } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'AddConnection';

export const operation: INodePropertyOptions = {
	name: 'Add Carrier Connection',
	value: METHOD,
	action: 'Add carrier connection',
};

export const properties: ConnectionProperties = [
	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	// Connection
	Carrier(METHOD),
	DeclaredDate(METHOD),
	DateProvisioned(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		Connection: {
			Carrier: this.getNodeParameter('Carrier', index),
			DeclaredDate: this.getNodeParameter('DeclaredDate', index),
			DateProvisioned: this.getNodeParameter('DateProvisioned', index),
		}
	});

	return this.helpers.returnJsonArray(responseData);

}
