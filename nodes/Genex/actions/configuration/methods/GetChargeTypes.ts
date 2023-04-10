
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConfigurationProperties } from '../../Interfaces';

const ENDPOINT = 'Configuration';
const SUBENDPOINT = '';
const METHOD = 'GetChargeTypes';

export const option = {
	name: 'Get Charge Types',
	value: METHOD,
	action: 'Get charge types'
};

export const properties: ConfigurationProperties = [];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {});
	return this.helpers.returnJsonArray(responseData);
}
