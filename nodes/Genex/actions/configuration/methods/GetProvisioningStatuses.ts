
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConfigurationProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'GetAccountStatuses';
//const PARSER = transport.parseGeneric();

export const option = {
	name: 'Get Account Statuses',
	value: METHOD,
	description:
		'Returns a list of account statuses configured in Genex. This refers to the Account Status field on Customer Screen.',
	action: 'Get account statuses'
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
