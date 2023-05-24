
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { CustomerProperties, ServiceAddressType } from '../../Interfaces';
import { CustomerNumber, Postcode, PropertyName, ServiceNumber, State, StreetName, StreetNumberEnd, StreetNumberStart, StreetNumberSuffix, StreetType, StreetTypeSuffix, Suburb, Type, TypeNumber, TypeSuffix } from '../../CommonFields';

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
	Postcode(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const getTypedParameter = (<T>(Parameter: string) => {
		const value = this.getNodeParameter(Parameter, index);
		if (value === undefined) {
			return undefined;
		}
		if (value === null) {
			return undefined;
		}
		return value as T || undefined;
	});

	const ServiceAddress: ServiceAddressType = {
		Type: 							getTypedParameter('Type'),
		TypeNumber: 				getTypedParameter('TypeNumber'), //this.getNodeParameter('TypeNumber', index) as string || undefined,
		TypeSuffix: 				getTypedParameter('TypeSuffix'), //this.getNodeParameter('TypeSuffix', index) || undefined,
		PropertyName: 			getTypedParameter('PropertyName'), //this.getNodeParameter('PropertyName', index) || undefined,
		StreetNumberStart:	getTypedParameter('StreetNumberStart'), //this.getNodeParameter('StreetNumberStart', index) || undefined,
		StreetNumberEnd: 		getTypedParameter('StreetNumberEnd'), //this.getNodeParameter('StreetNumberEnd', index) || undefined,
		StreetNumberSuffix: getTypedParameter('StreetNumberSuffix'), //this.getNodeParameter('StreetNumberSuffix', index) || undefined,
		StreetName: 				getTypedParameter('StreetName'), //this.getNodeParameter('StreetName', index) || undefined,
		StreetType: 				getTypedParameter('StreetType'), //this.getNodeParameter('StreetType', index) || undefined,
		StreetTypeSuffix: 	getTypedParameter('StreetTypeSuffix'), //this.getNodeParameter('StreetTypeSuffix', index) || undefined,
		Suburb: 						getTypedParameter('Suburb'), //this.getNodeParameter('Suburb', index) || undefined,
		State: 							getTypedParameter('State'), //this.getNodeParameter('State', index) || undefined,
		Postcode: 					getTypedParameter('Postcode'), //this.getNodeParameter('PostCode', index) || undefined,
	};

	let key: keyof ServiceAddressType;

	for (key in ServiceAddress) {
		if (ServiceAddress[key] === undefined) {
			delete ServiceAddress[key];
		}
	}

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		ServiceAddress
	});

	return this.helpers.returnJsonArray(responseData);
}
