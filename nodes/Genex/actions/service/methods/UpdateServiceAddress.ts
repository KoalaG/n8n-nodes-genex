
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { CustomerProperties } from '../../Interfaces';
import { Country, CustomerNumber, PostCode, PropertyName, ServiceNumber, State, StreetName, StreetNumberEnd, StreetNumberStart, StreetNumberSuffix, StreetType, StreetTypeSuffix, Suburb, Type, TypeNumber, TypeSuffix } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateServiceAddress';

export const operation: INodePropertyOptions = {
	name: 'Update Service Address',
	value: METHOD,
	action: 'Update service address',
};

export const properties: CustomerProperties = [

	CustomerNumber(METHOD),
	ServiceNumber(METHOD),
	//ServiceAddress
	Type(METHOD),
	TypeNumber(METHOD),
	TypeSuffix(METHOD),
	PropertyName(METHOD),
	StreetNumberStart(METHOD),
	StreetNumberEnd(METHOD),
	StreetNumberSuffix(METHOD),
	StreetName(METHOD),
	StreetType(METHOD),
	StreetTypeSuffix(METHOD),
	Suburb(METHOD),
	State(METHOD),
	PostCode(METHOD),
	Country(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		ServiceAddress: {
			Type: this.getNodeParameter('Type', index),
			TypeNumber: this.getNodeParameter('TypeNumber', index),
			TypeSuffix: this.getNodeParameter('TypeSuffix', index),
			PropertyName: this.getNodeParameter('PropertyName', index),
			StreetNumberStart: this.getNodeParameter('StreetNumberStart', index),
			StreetNumberEnd: this.getNodeParameter('StreetNumberEnd', index),
			StreetNumberSuffix: this.getNodeParameter('StreetNumberSuffix', index),
			StreetName: this.getNodeParameter('StreetName', index),
			StreetType: this.getNodeParameter('StreetType', index),
			StreetTypeSuffix: this.getNodeParameter('StreetTypeSuffix', index),
			Suburb: this.getNodeParameter('Suburb', index),
			State: this.getNodeParameter('State', index),
			PostCode: this.getNodeParameter('PostCode', index),
			Country: this.getNodeParameter('Country', index),
		}
	});

	return this.helpers.returnJsonArray(responseData);
}
