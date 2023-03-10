
import type { IExecuteFunctions } from 'n8n-core';
import type { IDataObject, INodeExecutionData } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConfigurationProperties } from '../../Interfaces';

const ENDPOINT = 'Configuration';
const SUBENDPOINT = '';
const METHOD = 'GetCycles';
//const PARSER = transport.parseGeneric();

export const option = {
	name: 'Get Cycles',
	value: METHOD,
	description:
		'Returns a list of billing cycles configured in Genex. This refers to “Cycle” field in Customer Details section of Customer Screen.',
	action: 'Get cycles'
};

export const properties: ConfigurationProperties = [];

export async function execute(
	this: IExecuteFunctions,
	// index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		// SearchString: this.getNodeParameter('SearchString', index),
	});

	const rawData = responseData['soap:Envelope']['soap:Body'];
	const data = rawData as IDataObject;

	return this.helpers.returnJsonArray(data);
}
