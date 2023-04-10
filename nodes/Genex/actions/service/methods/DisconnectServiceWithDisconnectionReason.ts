
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';
import { CustomerNumber, DisconnectionDate, DisconnectionReason, SendDisconnectionRequest, ServiceNumber } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'DisconnectServiceWithDisconnectionReason';

export const operation: INodePropertyOptions = {
	name: 'Disconnect Service With Disconnection Reason',
	value: METHOD,
	action: 'Disconnect service with disconnection reason',
};

export const properties: ServiceProperties = [
	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	DisconnectionDate(METHOD),
	SendDisconnectionRequest(METHOD),
	DisconnectionReason(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		DisconnectionDate: this.getNodeParameter('DisconnectionDate', index),
		SendDisconnectionRequest: this.getNodeParameter('SendDisconnectionRequest', index),
		DisconnectionReason: this.getNodeParameter('DisconnectionReason', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
