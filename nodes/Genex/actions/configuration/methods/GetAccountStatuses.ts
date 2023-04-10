
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ConfigurationProperties } from '../../Interfaces';

const ENDPOINT = 'Configuration';
const SUBENDPOINT = '';
const METHOD = 'GetAccountStatuses';

export const option = {
	name: 'Get Account Statuses',
	value: METHOD,
	action: 'Get account statuses'
};

export const properties: ConfigurationProperties = [];

export async function execute(
	this: IExecuteFunctions
): Promise<INodeExecutionData[]> {
	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {});
	return this.helpers.returnJsonArray(responseData);
}
