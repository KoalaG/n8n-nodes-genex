
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';
import { CustomerNumber, ExtraInformation, ServiceNumber } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateServiceExtraInformation';

export const operation: INodePropertyOptions = {
	name: 'Update Service Extra Information',
	value: METHOD,
	description: 'This web method is used to update the Extra Informationfield associated with a service.This is a generic field that can be used to save notes or additional service details such as IMEI number etc',
	action: 'Update service extra information',
};

export const properties: ServiceProperties = [
	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	ExtraInformation(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		ExtraInformation: this.getNodeParameter('ExtraInformation', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
