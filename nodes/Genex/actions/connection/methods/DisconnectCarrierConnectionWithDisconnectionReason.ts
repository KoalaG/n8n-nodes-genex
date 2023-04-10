
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConnectionProperties } from '../../Interfaces';
import { Carrier, CustomerNumber, DisconnectionDate, DisconnectionReason, SendDisconnectionRequest, ServiceNumber } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'DisconnectCarrierConnection';

export const operation: INodePropertyOptions = {
	name: 'Disconnect Carrier Connection With Disconnection Reason',
	value: METHOD,
	action: 'Disconnect carrier connection with disconnection reason',
};

export const properties: ConnectionProperties = [
	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	Carrier(METHOD),
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
		Carrier: this.getNodeParameter('Carrier', index),
		DisconnectionDate: this.getNodeParameter('DisconnectionDate', index),
		SendDisconnectionRequest: this.getNodeParameter('SendDisconnectionRequest', index),
		DisconnectionReason: this.getNodeParameter('DisconnectionReason', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
