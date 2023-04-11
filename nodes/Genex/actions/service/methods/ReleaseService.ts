
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';
import { CustomerNumber, DisconnectionDate, SendDisconnectionRequest, ServiceNumber } from '../../CommonFields';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'ReleaseService';

export const operation: INodePropertyOptions = {
	name: 'Release Service',
	value: METHOD,
	description:
		'This web method is used to release a service.Only one instance of non-released service number (phone number/email address/ip address/domain name/subscriber identifier) can exist in Genex. Use this web method to release a service if a customer cancels the service/account. This will ensure that in future the same service number can be added again in Genex, in case of change of ownership etc., on another account.',
	action: 'Release service',
};

export const properties: ServiceProperties = [
	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	{
		displayName: 'Release Date',
		name: 'ReleaseDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'Date service to be released',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	DisconnectionDate(METHOD),
	SendDisconnectionRequest(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		ReleaseDate: this.getNodeParameter('ReleaseDate', index),
		DisconnectionDate: this.getNodeParameter('DisconnectionDate', index),
		SendDisconnectionRequest: this.getNodeParameter('SendDisconnectionRequest', index),
	});

	return this.helpers.returnJsonArray(responseData);
}
