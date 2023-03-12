
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConfigurationProperties } from '../../Interfaces';

const ENDPOINT = 'Configuration';
const SUBENDPOINT = '';
const METHOD = 'GetCustomerTypes';
//const RESPONSETYPE = 'CustomerTypeData';
//const PARSER = transport.parseGeneric();

export const option = {
	name: 'Get Customer Types',
	value: METHOD,
	description:
		'Returns a list of Customer Type (ex. Business, SME, Residential etc.) configured in Genex. This refers to “Customer Type” field in Customer Details section of Customer Screen.',
	action: 'Get customer types'
};

export const properties: ConfigurationProperties = [];

export async function execute(
	this: IExecuteFunctions,
	// index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		// SearchString: this.getNodeParameter('SearchString', index),
	});

	return this.helpers.returnJsonArray(responseData);
}
